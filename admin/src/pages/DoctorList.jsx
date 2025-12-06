import React, { useEffect, useState } from 'react'
import { Trash2, Mail, Phone } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function DoctorList() {
  const token = localStorage.getItem('token')
  const[doctors,setDoctors] = useState([])
const [loading, setLoading] = useState(true);


 const allDoctors = async () => {
  try {
    const res = await fetch('http://localhost:4000/api/admin/getAllDoctors', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) {
      console.log("Server error:", res.status);
      return;
    }

    const data = await res.json();
    console.log(data);

    setDoctors(data.data || []);

  } catch (error) {
    console.log("Fetch error:", error);
  }finally {
      setLoading(false);
    }
};

  useEffect(() => {
    allDoctors(); 
  }, []);


  const changeAvailablity = async(docId)=>{
try {
  const res = await fetch("http://localhost:4000/api/admin/change-availablity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ docId })
    
  });

  const data = await res.json();
   if (data.success) {
    toast.success(data.message)
    console.log("Updated availability:", data.available);
   allDoctors();
   
  }else{
    toast.error(data.message)
  }
  
} catch (error) {
  console.log(error);
  toast.error(error.message)
}
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading list...
      </div>
    );
  }
  return (
    <>
     <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
  All Doctors
</h2>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
  {doctors.map((doctor) => (
    <DoctorCard
      key={doctor._id}
      doctor={doctor}
      onToggle={() => changeAvailablity(doctor._id)}
    />
  ))}
</div>

     
    </>
  )
}

export default DoctorList