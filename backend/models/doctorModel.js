import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name:{type:String ,required : true},
    email : {type:String ,required : true, unique : true},
    password:{type:String ,required : true},
     image:{type:String ,required : true},
    experience:{type:String ,required : true},
    speciality:{type:String ,required : true},
    education:{type:String ,required : true},
    bio:{type:String ,required : true},
    location:{type:String ,required : true},
    available:{type:Boolean ,default : true},
    fee:{type:Number ,required : true},
    date:{type:Date,required : true,  default: Date.now},
    slotsBooked:{type:Object, default:{}},
},{minimize:false})

const doctorModel = mongoose.models.doctor||mongoose.model('doctor' , doctorSchema);

export default doctorModel;