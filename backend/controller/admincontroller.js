//apis to add doctor
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';
import path from "path";
import jwt from 'jsonwebtoken'

import validator from 'validator';
import appointmentModel from '../models/appointmentModel.js';
export const addDoctor = async(req,res) =>{

    try {
        const{name,
    email ,
    password,
    experience,
    speciality,
    education,
    bio,
    location,
    fee,
    } = req.body

    
   

    //checking all data 
    if(!name || ! email|| ! password|| !experience || !speciality || ! education || !bio || !location || !fee){
      return res.json({status:'false', message:"Missing details"})
    }
    //validating email format
    if(!validator.isEmail(email)){
            return res.json({status:'false', message:"please enter a valid email"})

    }
    if(password.length<8){
                  return res.json({status:'false', message:"please enter a strong password"})

    }
           
     //password 
     const salt = await bcrypt.genSalt(10);
     const hashedpassword = await bcrypt.hash(password,salt);

     //upload image to cloudinary 
     const imageFile = req.file; 
console.log("Uploaded file:", imageFile);

if (!imageFile) {
  return res.status(400).json({ success: false, message: "Image file not found!" });
}

const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
  resource_type: "image",
});
const imageURL = imageUpload.secure_url;


//add to database
     const doctorData ={
      name,
    email ,
    password:hashedpassword,
    image:imageURL,
    experience,
    speciality,
    education,
    bio,
    location,
  date:new Date(),
    fee,
     }

const newDoctor = doctorModel(doctorData);
newDoctor.save();

      // Send a response so the client knows it's done
    res.status(200).json({
      success: true,
      message: "Doctor added successfully",
      
    });
    } catch (error) {
        console.log(error)
        if (error.code === 11000) {

      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `Duplicate value for ${field}: ${error.keyValue[field]}. Please use a different ${field}.`
      });
    }
         res.json({
      success: false,
      message: "Doctor not added ",
      
    });
    }
}


export const loginAdmin = async (req,res) => {
try {
  const{email ,password} =req.body;
  if(email==process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
             let token = jwt.sign({email,password},process.env.JWT_SECRET);
             res.json({success:true,token})
  }else{
    res.json({succes:false, message:"invalid credentials"})
  }
  
} catch (error) {
 console.log(error)
 res.json({success:false , message:"failed to login"})
    
}
}

 export const getAllDoctors = async (req,res)=>{
  try {
    const doctors = await doctorModel.find()

    res.json({
      success:true,
      data : doctors,
      message:"getting all doctors"
    })
    
  } catch (error) {
    console.log(error)
 res.json({success:false , message:"failed to get doctors"})
  }
}
export const getAppointments = async(req,res)=>{
  try {
    const appointments = await appointmentModel.find({})
     res.json({
      success:true,
    appointments
    })
  } catch (error) {
    console.log(error)
 res.json({success:false , message:"failed to get appointments"})
  }
}


export const markAppointmentCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

  
    appointment.isCompleted = true;
    appointment.cancelled = false;

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment marked as completed",
      appointment,
    });
  } catch (error) {
    console.error("Mark Completed Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

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

export const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await doctorModel.countDocuments();
    const totalPatients = await userModel.countDocuments();
    const totalAppointments = await appointmentModel.countDocuments();

    const upcomingAppointments = await appointmentModel.countDocuments({
      cancelled: false,
      isCompleted: false,
    });

    res.status(200).json({
      success: true,
      stats: {
        totalDoctors,
        totalPatients,
        totalAppointments,
        upcomingAppointments,
      },
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};
