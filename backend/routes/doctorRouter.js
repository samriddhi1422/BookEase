import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import { doctorLogin, getAppointments,markAppointmentCompleted,cancelAppointment, getDoctorDashboardStats, getDoctorProfile, updateDoctorProfile } from '../controller/doctorcontroller.js';
const doctorRouter = express.Router();

doctorRouter.post('/login',doctorLogin)
doctorRouter.get('/getAppointments',authMiddleware,getAppointments)
doctorRouter.put("/appointments/:id/complete",authMiddleware, markAppointmentCompleted)
doctorRouter.put('/cancel/:appointmentId', authMiddleware, cancelAppointment)
doctorRouter.get('/stats', authMiddleware, getDoctorDashboardStats)
doctorRouter.get('/profile', authMiddleware, getDoctorProfile)
doctorRouter.put('/update', authMiddleware, updateDoctorProfile)

export default doctorRouter;