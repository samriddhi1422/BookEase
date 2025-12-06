import React from "react";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function MyAppointment() {
  const [appointments, setAppointments] = useState([]);
 const { token, user } = useSelector((state) => state.auth);
 const cancelAppointment = async (id) => {
  try {
    const res = await fetch(
      `https://bookease-backend-ju5w.onrender.com/api/patient/cancel/${id}`,
      {
        method: "PUT",
         headers: {
        Authorization: `Bearer ${token}`
      }
      }
    );

    const data = await res.json();

    if (data.success) {
      // Update list instantly
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

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("https://bookease-backend-ju5w.onrender.com/api/patient/getAppointmentList", {
          method: "GET",
           headers: {
        Authorization: `Bearer ${token}`
      }
        });

        const data = await res.json();

        if (data.success) {
          setAppointments(data.data);
        }
      } catch (error) {
        console.log("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const appointmentRazorpay = async (appointmentId) => {
  try {
    const res = await fetch("https://bookease-backend-ju5w.onrender.com/api/patient/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ appointmentId }),
    });

    const data = await res.json();  

    if (!data.success) {            
      alert(data.message);
      return;
    }

    const { order } = data;         
 console.log("Payment API Response:", data);
    //  Open Razorpay Checkout
    const options = {
      key: 'rzp_test_RnAoNaS5dioRCM', 
      amount: order.amount,
      currency: order.currency,
      name: "Hospital Management",
      description: "Doctor Appointment Payment",
      order_id: order.id,

      handler: function (response) {
        console.log("Payment Success:", response);
        toast.success("Payment Successful")
        
      },

      prefill: {
        name: "Patient Name",
        email: "patient@gmail.com",
        contact: "9999999999",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

  } catch (error) {
    console.log(error);
   toast.error(error.message)
  }
};

  
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          My Appointments
        </h1>
        <p className="text-gray-600">Manage your appointments easily</p>
      </div>

      {/* Appointment List */}
      <div className="divide-y divide-gray-200 ">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 mt-4  bg-white p-5 rounded-2xl "
          >
          
            {/* Left Section: Image + Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left flex-grow">
              {/* Doctor Image */}
              <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-indigo-50 shadow-sm">
                <img
                  src={appointment.docData?.image}
                  alt={appointment.docData?.name}
                  className="object-cover w-full h-full"
                  draggable={false}
                />
              </div>

              {/* Doctor Info */}
              <div className="w-full sm:w-auto">
                <h3 className="text-lg font-semibold text-gray-900">
                  {appointment.docData?.name}
                </h3>
                <p className="text-sm text-gray-500">{appointment.docData?.specialty}</p>

                <p className="mt-2 text-sm text-gray-700">
                  <span className="font-semibold">Address:</span>{" "}
                  {appointment.docData?.location}
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  <span className="font-semibold">Date & Time:</span>{" "}
                  {appointment.slotDate} — {appointment.slotTime}
                </p>
              </div>
            </div>

            {/* Right Section: Buttons */}
            <div className="flex sm:flex-col justify-center items-center sm:items-end gap-3 min-w-[160px] w-full sm:w-auto">
           { !appointment.cancelled &&    <button
                className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition text-sm"
                type="button"
                onClick={()=>appointmentRazorpay(appointment._id)}
              >
              Pay Online
              </button>}
            <button
  onClick={() => cancelAppointment(appointment._id)}
  className="w-full sm:w-auto px-6 py-2 border border-red-400 text-red-500 rounded-md hover:bg-red-50 transition text-sm"
  disabled={appointment.cancelled}
>
  {appointment.cancelled ? "Cancelled" : "Cancel appointment"}
</button>

            </div>
          </div>
          
        ))}
      </div>
      
    </div>
  );
}
