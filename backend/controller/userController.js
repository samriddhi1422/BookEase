import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary';
import userModel from '../models/userModel.js';
import path from "path";
import validator from 'validator';
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';
import { escape } from 'querystring';
import razorpay from 'razorpay'
export const userRegisration=async(req,res)=>{
   try {
    const {name,email,password} = req.body;
    if(!name||!password||!email){
        return res.json({success:'false', message:"missing details"})
    }
   
    if(password.length<8){
         return res.json({success:'false', message:"Enter strong password"})
    }
    if(!validator.isEmail(email)){
          return res.json({success:'false', message:"Enter a valid email"})
    }
      const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already registered" });
    }
    //hashing user password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData ={
        name,
        email,
        password:hashedPassword
    }

    const newUser = new userModel(userData);
    const user = await newUser.save()
   
  const token = jwt.sign(
      { _id: user._id },

      process.env.JWT_SECRET,
     
    );
 res.json({
  success: true,
  user: {
    _id: user._id,
    name: user.name,
    email: user.email
  },
  token
});
   } catch (error) {
    console.log(error)
      res.status(500).json({ message: "Server error", error: error.message });
   }
}

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing email or password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      
    );

    res.json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserData = async (req, res) => {
    console.log("getUserData controller HIT");

  try {
    const user = await userModel.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateProfile = async(req,res)=>{
  try {
     const userId = req.user.id; 
    
    const {name ,phone,address,dateOfBirth,bloodGroup, emergencyContact} = req.body
    let formattedDOB;

if (dateOfBirth.includes("/")) {
  // DD/MM/YYYY
  const [day, month, year] = dateOfBirth.split("/");
  formattedDOB = new Date(`${year}-${month}-${day}`);
} else {
  // ISO → YYYY-MM-DD
  formattedDOB = new Date(dateOfBirth);
}

    const imageFile = req.file
    if(!name || !phone || !address || !dateOfBirth || !bloodGroup || !emergencyContact ){
      return  res.status(500).json({ success: false, message: "Data Missing" });
    }
    await userModel.findByIdAndUpdate(userId,{name ,phone,address, dateOfBirth: formattedDOB,bloodGroup, emergencyContact})

  if(imageFile){
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
  resource_type: "image",
});
const imageURL = imageUpload.secure_url;
await userModel.findByIdAndUpdate(userId ,{image:imageURL})
  }

  res.json({success:true, message: "profile updated"})

  } catch (error) {
   console.log("UPDATE PROFILE ERROR:", error);  // <-- ADD THIS
  return res.status(500).json({ success: false, message: "Server error" });
  }
}

//api for booking appointment
export const appointmentBook = async(req,res)=>{
 
  try {
      

      const {
      docId,
      slotDate,
      slotTime,
    } = req.body;
    const userId = req.user;
 console.log(userId)
 console.log(docId)
   
    const docData = await doctorModel.findById(docId).select('-password')
    if(!docData. available){
return res.json({ success: false, message: "Doctor Not available" });
    }
    const slotsBooked = docData.slotsBooked
    console.log("Doctor slots from DB:", docData.slotsBooked)

   const normalizedDate = new Date(slotDate).toISOString().split("T")[0];

    //checking availablity
     if (slotsBooked[normalizedDate]) {
  if (slotsBooked[normalizedDate].includes(slotTime)) {
    return res.status(400).json({
      success: false,
      message: "Slots not available"
    });
  } else {
    slotsBooked[normalizedDate].push(slotTime);
  }
} else {
  slotsBooked[normalizedDate] = [];
  slotsBooked[normalizedDate].push(slotTime);
}

    docData.slotsBooked = slotsBooked;
    await docData.save();
     const userData = await userModel.findById(userId).select('-password')
     
    const appointment = new appointmentModel({
      userId,
      docId,
      slotDate:normalizedDate,
      slotTime,
      docData,
      userData,
      amount:docData.fee,
      date: Date.now(),
    });

    const newAppointment = new appointmentModel(appointment)
    await newAppointment.save()

    
//saving new slots data in docdata
await doctorModel.findByIdAndUpdate(docId, { slotsBooked })

res.json({ success: true, message: "Appointment booked", appointment });

  } catch (error) {
    console.log("BOOKING ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

//api to get-all user using my profile page

export const getAllAppointmentList =async(req,res)=>{
  const userId = req.user
 try {
    const appnt = await appointmentModel.find({userId})
   res.json({
      success: true,
      message: "Appointment list fetched successfully",
      data: appnt,
    });
  //  console.log(appnt)
 } catch (error) {
  console.log(error)
  res.json({success:true, message: "Server error"})
 }
}

export const cancelAppointment = async (req, res) => {

  try {
    const appointmentId = req.params.appointmentId;

    const updated = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { cancelled: true },
      { new: true }
    );
     if (!updated) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    const {docId,slotDate,slotTime} = updated
    const docData = await doctorModel.findById(docId)
    let slotsBooked =docData.slotsBooked
    slotsBooked[slotDate]= slotsBooked[slotDate].filter(e=> e !== slotTime)
    await doctorModel.findByIdAndUpdate(docId,{slotsBooked})
   

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
      data: updated,
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_ID,
  key_secret:process.env.RAZORPAY_SECRET
})
//api to make payment using razorpay
export const payment = async (req,res)=>{
  try {
    const {appointmentId} = req.body
   const appointmentSData = await appointmentModel.findById(appointmentId)
   if(!appointmentSData || appointmentSData.cancelled ){
    res.json({success:false , message:"appointment not found"})
   }

   //creating options for payment
   const options ={
    amount : appointmentSData.amount * 100,
    currency : process.env.CURRENCY,
    receipt : appointmentId

   }

   //creation of an order
   const order = await razorpayInstance.orders.create(options)
    res.json({success:true , order: order})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
   
   
}