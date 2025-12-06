import express from 'express'
import { getAllDoctors } from '../controller/admincontroller.js';
import { appointmentBook, cancelAppointment, getAllAppointmentList, payment, updateProfile, userRegisration } from '../controller/userController.js';
import { userLogin } from '../controller/userController.js';
import { authUser} from '../middleware/authUser.js';
import { getUserData } from '../controller/userController.js';
import upload from '../middleware/multer.js'

const patientRouter = express.Router();
patientRouter.get('/doctorlist' , getAllDoctors);
patientRouter.post('/register',userRegisration)
patientRouter.post('/login',userLogin)
patientRouter.get('/userData', authUser,getUserData)
patientRouter.post('/updateUserData', upload.single('image'),  authUser,updateProfile)
patientRouter.post('/bookAppointment', authUser,appointmentBook)
patientRouter.get('/getAppointmentList', authUser,getAllAppointmentList)
patientRouter.put('/cancel/:appointmentId',authUser,cancelAppointment)
patientRouter.post('/payment',authUser,payment)


export default patientRouter;