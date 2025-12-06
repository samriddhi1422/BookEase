import React, { useState ,useEffect} from 'react'
import { toast } from "react-toastify";
function Appointments() {
  const token = localStorage.getItem('token')
    const[appointments,setAppointments] = useState([])
      const [loading, setLoading] = useState(true);
    
  const allAppointments = async () => {
  try {
    const res = await fetch('https://bookease-backend-ju5w.onrender.com/api/admin/appointments', {
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

    setAppointments(data.appointments || []);

  } catch (error) {
    console.log("Fetch error:", error);
  }finally {
      setLoading(false);
    }
};
useEffect(() => {
    allAppointments(); 
  }, []);
   if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading appointments...
      </div>
    );
  }

  const markCompleted = async (id) => {
  try {
    const res = await fetch(
      `https://bookease-backend-ju5w.onrender.com/api/admin/appointments/${id}/complete`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (data.success) {
   
      setAppointments((prev) =>
        prev.map((apt) =>
          apt._id === id ? { ...apt, isCompleted: true, cancelled: false } : apt
        )
      );
       toast.success("Completed Successfully")
    } 
  } catch (error) {
    console.log("Mark completed error:", error);
    toast.error(error.message)
  }
};


const cancelAppointment = async (id) => {
  try {
    const res = await fetch(
      `https://bookease-backend-ju5w.onrender.com/api/admin/cancel/${id}`,
      {
        method: "PUT",
         headers: {
        Authorization: `Bearer ${token}`
      }
      }
    );

    const data = await res.json();

    if (data.success) {
      
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id
            ? { ...appointment, cancelled: true }
            : appointment
        )
      );
      toast.success("Cancelled Successfully")
    }
  } catch (error) {
    console.log("Cancel error:", error);
      toast.error(error.message)
  }
};
  return (
  
  <div className="min-h-screen  p-6 sm:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Admin Appointments</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage and track all bookings
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {appointments.map((apt) => (
          <div
            key={apt._id}
            className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-blue-500 p-[2px]">
                <img
                  src={apt.docData && apt.docData.image}
                  alt="doctor"
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">
                  {apt.docData && apt.docData.name}
                </h4>
                <p className="text-xs text-gray-500">
                  Patient • {apt.userData && apt.userData.name}
                </p>
              </div>
            </div>

            <div className="flex justify-between gap-3 mb-4">
              <div className="flex-1  rounded-xl border-blue-900 border-1 p-2 text-center">
                
                <p className="text-sm font-semibold text-blue-900" >
                  {apt.slotDate}
                </p>
              </div>
              <div className="flex-1 rounded-xl border-blue-900 border-1 p-2 text-center">
               
                <p className="text-sm font-semibold text-blue-900">
                  {apt.slotTime}
                </p>
              </div>
            </div>

            <div className="mb-4">
              {apt.cancelled && (
                <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-800">
                  Cancelled
                </span>
              )}
              {apt.isCompleted && (
                <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                  Completed
                </span>
              )}
              {!apt.cancelled && !apt.isCompleted && (
                <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                  Upcoming
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {!apt.isCompleted && !apt.cancelled &&
              <button className="flex-1 py-2 rounded-xl  text-sm font-semibold text-indigo-400 border-1 hover:bg-indigo-700 transition" onClick={() => markCompleted(apt._id)}>
                Mark Completed
              </button>}
              
              {!apt.isCompleted && 
               <button className="flex-1 py-2 rounded-xl text-sm font-semibold text-red-800 bg-white hover:bg-red-200 transition border-1 "onClick={() => cancelAppointment(apt._id)}>
               {apt.cancelled ? "Cancelled" : "Cancel"}
              </button>
              }
             
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Appointments