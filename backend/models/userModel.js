import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
     
    },
    password:{
 type: String,
      required: true,
    },
    image: {
      type: String,
      default: "/profile.png", 
    },
    email: {
      type: String,
      required: true,
      unique: true, 
      lowercase: true,
      
    },
    phone: {
      type: String,
      default: "",
   
    },
    address: {
      type: String,
     default: "",
    },
    dateOfBirth: {
      type: Date,
    default: null,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], 
      default: null,
    },
    emergencyContact: {
      type: String,
       default: "",
    },
  },
  {
    timestamps: true,
  }
);


const userModel =
  mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
