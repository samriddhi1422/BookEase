import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRouter.js';
import { getAllDoctors, loginAdmin } from './controller/admincontroller.js';
import patientRouter from './routes/patientRouter.js';
import doctorRouter from './routes/doctorRouter.js'

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())
connectDB()
connectCloudinary();
//api end point
app.use('/api/admin' , adminRouter)
// app.use('/api/admin' , loginAdmin)
// app.use('/api/admin',getAllDoctors)
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});
app.use('/api/patient', patientRouter);
app.use('/api/doctor', doctorRouter);

//localhost:4000/api/admin

app.get('/',(req,res)=>{
  res.send("API WORKING ")
})

app.listen(port,()=>console.log("server started" + port));
