import express from 'express'
import { addDoctor, cancelAppointment, getAppointments, markAppointmentCompleted } from '../controller/admincontroller.js';
import { loginAdmin } from '../controller/admincontroller.js';
import upload from '../middleware/multer.js'
import authMiddleware from '../middleware/authMiddleware.js';
import { getAllDoctors } from '../controller/admincontroller.js';
import { changeAvailablity } from '../controller/doctorcontroller.js';
import { getDashboardStats } from '../controller/admincontroller.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor' ,authMiddleware,upload.single('image'),addDoctor)
adminRouter.post('/login' ,loginAdmin)
adminRouter.get('/getAllDoctors' ,authMiddleware,getAllDoctors)
adminRouter.post('/change-availablity', authMiddleware,changeAvailablity)
adminRouter.get('/appointments',authMiddleware, getAppointments)
adminRouter.put("/appointments/:id/complete",authMiddleware, markAppointmentCompleted)
adminRouter.put('/cancel/:appointmentId', authMiddleware, cancelAppointment)
adminRouter.get("/stats", authMiddleware, getDashboardStats);

export default adminRouter;