import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const changeAvailablity = async(req,res)=>{
    try {
        const {docId}= req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate({ _id: docId },{available: !docData.available})
        res.json({
            success: true,
            message :"availablity change "
        })
    } catch (error) {
        console.log(error)
 res.json({success:false , message:"failed to change availablity"})
    }
}

export const doctorLogin = async(req,res)=>{
    try {
        const{ email, password} = req.body
    const doctor = await doctorModel.findOne({email})
    if(!doctor){
         res.json({
            success: false,
            message :"Invalid credentials"
        })
    }
   
        const isMatch = await bcrypt.compare(password,doctor.password)
    
    if(!isMatch){
        return res.json({
        success: false,
        message: "Invalid credentials",
      });
        }
        const token = jwt.sign({ id:doctor._id},process.env.JWT_SECRET)
    
    res.json({
      success: true,
      message: "Login successful",
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email
      },
      token
    }); 
    } catch (error) {
        console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
    }
   
}
export const getAppointments = async(req,res)=>{
    const docId = req.admin.id;
  try {
    const appointments = await appointmentModel.find({ docId })
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

export const getDoctorDashboardStats = async (req, res) => {
  try {
    
    const docId = req.admin.id;  

   
    const totalAppointments = await appointmentModel.countDocuments({
      docId,
    });


   
    const completedAppointments = await appointmentModel.countDocuments({
      docId,
      isCompleted: true,
    });

 
    const totalPatients = await appointmentModel.distinct("userId", {
      docId,
    });

    res.status(200).json({
      success: true,
      stats: {
        totalAppointments,
        
        completedAppointments,
        totalPatients: totalPatients.length,
      },
    });
  } catch (error) {
    console.error("Doctor Stats API Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor stats",
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  try {
    const docId = req.admin.id; 

    const doctor = await doctorModel.findById(docId).select("-password");

    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.log("Get Doctor Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor profile",
    });
  }
};
export const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.admin.id;

    const updated = await doctorModel.findByIdAndUpdate(
      docId,
      { ...req.body },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      doctor: updated,
    });
  } catch (error) {
    console.log("Update Doctor Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
