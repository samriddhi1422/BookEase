import React, { useState } from 'react'
import {toast} from 'react-toastify'
import photo from "../assets/default.png";

function AddDoctor() {
  const[docImage,setDocImage] = useState(null);
  const[name , setName] = useState('')
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[bio,setBio] = useState('')
  const[location,setLocation] = useState('')
  const[education,setEducation] = useState('')
  const[fee, setFees] = useState('')
  const[speciality, setSpeciality] = useState('')
  const[experience, setExperience] = useState('')

  const onSubmit= async(event)=>{
    event.preventDefault();
    const token = localStorage.getItem("token")
    console.log(token)
    console.log("🟢 Submit button clicked");
   
     if(!docImage){
     return toast.error("Image not selected")
     }
     try {
      const token = localStorage.getItem("token")
       const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("speciality", speciality);
    formData.append("experience", experience);
    formData.append("education", education);
    formData.append("location", location);
    formData.append("fee", Number(fee));
    formData.append("bio", bio);
    if (docImage) {
      formData.append("image", docImage);

      const res = await fetch('http://localhost:4000/api/admin/add-doctor',{
       method:"POST",
         headers: {
    Authorization: `Bearer ${token}`, 
  },
       body: formData
       });
       
       const data = await res.json();
        console.log(" Server Response:", data);
        if (!res.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

        if(data.success){
         toast.success("Doctor added succesfuy")
          handleClear();
        }else {
      toast.error(data.message || "Failed to add doctor!");
    }

    }
     } catch (error) {
      
        console.error("Error adding doctor:", error);
    toast.error(error.message || "Server error!");
     }
  }
  const handleClear = () => {
  setDocImage(null);
  setName("");
  setEmail("");
  setPassword("");
  setSpeciality("");
  setExperience("");
  setEducation("");
  setLocation("");
  setFees("");
  setBio("");
};
  return (
   <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
  {/* Page Title */}
  <h1 className="text-4xl font-semibold text-gray-800 mb-10 tracking-tight">
    Add <span className="text-blue-600">New Doctor</span>
  </h1>

  {/* Card Container */}
  <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl border border-gray-200 p-10">
    {/* Form Section */}
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit}>
      {/* Profile Section (Now inside the form) */}
      <div className="md:col-span-2 flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src={docImage ? URL.createObjectURL(docImage) : photo}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
          />
        </div>
        <label
          htmlFor="docImage"
          className="mt-3 inline-block bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-100 transition"
        >
          Upload Photo
        </label>
        <input
          type="file"
          id="docImage"
          name="docImage"
          accept="image/*"
          className="hidden"
          onChange={(e) => setDocImage(e.target.files[0])}
        />
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Dr. John Doe"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="doctor@bookease.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="........."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* Speciality */}
      <div>
        <label
          htmlFor="speciality"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Speciality *
        </label>
        <input
          type="text"
          id="speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          placeholder="Cardiologist, Dentist, etc."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* Experience */}
      <div>
        <label
          htmlFor="experience"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Experience (Years) *
        </label>
        <input
          type="number"
          id="experience"
          placeholder="5"
          min="0"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* Education */}
      <div>
        <label
          htmlFor="education"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Education *
        </label>
        <input
          type="text"
          id="education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          placeholder="MBBS, MD (Medicine)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Location *
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="New Delhi, India"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* Fee */}
      <div>
        <label
          htmlFor="fee"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Consultation Fee (₹) *
        </label>
        <input
          type="number"
          id="fee"
          value={fee}
          onChange={(e) => setFees(e.target.value)}
          placeholder="500"
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
      </div>

      {/* Bio */}
      <div className="md:col-span-2">
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Bio *
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="3"
          placeholder="Write a short bio..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="md:col-span-2 flex flex-col sm:flex-row sm:justify-end gap-2 sm:gap-4 pt-3 sm:pt-4 w-full">
        <button
          type="button"
          onClick={handleClear}
          className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
        >
          Clear
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-8 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
          
        >
          Add Doctor
        </button>
      </div>
    </form>
  </div>
</div>
 
  );
}

export default AddDoctor;
