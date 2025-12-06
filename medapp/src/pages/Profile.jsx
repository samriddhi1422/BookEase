import React, { useState } from 'react'
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { setUserImage } from '../slice/authSlice.js';





function Profile() {
 
  const { token, user } = useSelector((state) => state.auth);
const [userData, setUserData] = useState(null);
const [imageFile, setImageFile] = useState(null);

console.log(token)
  useEffect(() => {
  const fetchProfile = async () => {
    const res = await fetch("http://localhost:4000/api/patient/userData", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    if (data.success) {
      setUserData(data.user);
    }
  };

  fetchProfile();
}, []);


 const updateUserProfile = async (formValues, imageFile, token) => {
  try {
    const formData = new FormData();

    formData.append("name", formValues.name);
    formData.append("phone", formValues.phone);
    formData.append("address", formValues.address);
    formData.append("bloodGroup", formValues.bloodGroup);
    formData.append("emergencyContact", formValues.emergencyContact);
    formData.append("dateOfBirth", formValues.dateOfBirth);

 
    if (imageFile) {
      formData.append("image", imageFile);
   
    }

   const res = await fetch("http://localhost:4000/api/patient/updateUserData", {
      method: "POST",
      body: formData, 
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    return data;

  } catch (error) {
    console.log("UPDATE USERDATA ERROR (Frontend):", error);
    return { success: false, message: "Frontend error" };
  }
};
const dispatch = useDispatch();

const handleSave = async () => {
  const res = await updateUserProfile(userData, imageFile, token);  

  if (res.success) {
   if (imageFile) {
      const preview = URL.createObjectURL(imageFile);
      dispatch(setUserImage(preview));
   }
    toast.success('Profie Updated')
    setIsEdit(false);
  } else {
   toast.error('Update Faied or Missing Details')
  }
};


  const[isEdit, setIsEdit] = useState(false);
   if (!userData) {
    return (
      <div className="h-screen flex items-center justify-center text-xl">
        Loading profile...
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-gray-50 py-8">
   <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-8 flex justify-between items-start">
           <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>
           
            {isEdit 
            ? <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" onClick={handleSave}>Save</button>
          : <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" onClick={()=>setIsEdit(true)}>Edit Profile</button>}
          
          
    </div>
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-100">
              
               <img
             src={imageFile ? URL.createObjectURL(imageFile) : userData.image}
          
            className=" border-2 border-blue-500 object-cover shadow-sm w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center"
          />
     {isEdit && (
  <label className="mt-3 flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-blue-400 rounded-lg cursor-pointer hover:bg-blue-50 transition">
    <span className="text-blue-600 font-medium">Click or Drag to Upload Image</span>
    
    <input
      type="file"
      className="hidden"
      onChange={(e) => setImageFile(e.target.files[0])}
    />
  </label>
)}


              <h2 className="text-xl font-semibold text-gray-900 mb-1">
               <p lassName="text-gray-900">{userData.name}</p>
              
                
              </h2>
             <p lassName="text-gray-900">{userData.email}</p>
              
              
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name
                  </label>
                
                   { isEdit 
                ? <input type='text' value={userData.name} onChange={e=> setUserData(prev =>({...prev,name:e.target.value}))}  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></input>
              : <p className="text-gray-900">{userData.name}</p>
              }
                  
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email Address
                  </label>
                 
                    { isEdit 
                ? <input type='text' value={userData.email} onChange={e=> setUserData(prev =>({...prev,email:e.target.value}))}  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></input>
              : <p className="text-gray-900">{userData.email}</p>
              }
                
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Phone Number
                  </label>
                  
                    { isEdit 
                ? <input type='text' value={userData.phone} onChange={e=> setUserData(prev =>({...prev,phone:e.target.value}))}  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></input>
              : <p className="text-gray-900">{userData.phone}</p>
              }
                
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Address
                  </label>
                  
                    { isEdit 
                ? <input type='text' value={userData.address} onChange={e=> setUserData(prev =>({...prev,address:e.target.value}))}  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></input>
              : <p className="text-gray-900">{userData.address}</p>
              }
                
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Date of Birth
                  </label>
                  { isEdit 
                ? <input    type="date"  value={userData.dateOfBirth?.slice(0,10)}  onChange={e=> setUserData(prev =>({...prev,dateOfBirth:e.target.value}))}  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></input>
              : <p className="text-gray-900">{new Date(userData.dateOfBirth).toLocaleDateString()}</p>
              }
                    
                  
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                 
                    { isEdit 
                ? <input type='text' value={userData.bloodGroup} onChange={e=> setUserData(prev =>({...prev,bloodGroup:e.target.value}))}  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></input>
              : <p className="text-gray-900">{userData.bloodGroup}</p>
              }
                  
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                 
                    { isEdit 
                ? <input type='text' value={userData.emergencyContact} onChange={e=> setUserData(prev =>({...prev,emergencyContact:e.target.value}))}  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></input>
              : <p className="text-gray-900">{userData.emergencyContact}</p>
              }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
   </div>
   </div>
  )
}

export default Profile