import React from 'react'
import { Star, MapPin, GraduationCap, Calendar, Clock, DollarSign } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,Navigate, useNavigate} from 'react-router-dom';
import { useState,useEffect} from 'react';
import { getDoctorsData } from '../slice/doctorSlice';
import { startBooking,bookingSuccess,bookingFail } from '../slice/appointmentSlice';
import {toast} from 'react-toastify'
function Appointment() {
  const { user } = useSelector((s)=> s.auth)
  const { token } = useSelector((state)=> state.auth);
const navigate = useNavigate();

const { docId } = useParams();
 const [selectedSlot, setSelectedSlot] = useState('');
  
const [selectedDate, setSelectedDate] = useState("");

  const [showBookingModal, setShowBookingModal] = useState(false);
 

const dispatch = useDispatch();
  const { loading, success, error } = useSelector((s) => s.appointment);



  const { doctors, } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctorsData());
  }, [docId]);


   const doctor = doctors.find(d => String(d._id) === String(docId));



if (!doctor) return <p>Doctor not found.</p>;
 const availableSlots = doctor.availableSlots || ["10:00 AM", "12:00 PM", "3:00 PM"];



  const handleBookAppointment = async () => {
    if(!token){
     toast.warn("Please Login")
    return navigate('/login')
    }
  if (!selectedSlot || !selectedDate) {
    toast.error("Please select a slot and date");
    return;
  }

  dispatch(startBooking()); // redux: loading true

  setShowBookingModal(true); 

  try {
    const res = await fetch("http://localhost:4000/api/patient/bookAppointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify({
           
        docId: doctor._id,        
        slotDate: selectedDate,
        slotTime: selectedSlot,
      }),
    });

    const data = await res.json();

    if (data.success) {
      dispatch(bookingSuccess(data.appointment));     // redux: store appointment
      setShowBookingModal(false);
      toast.success("Appointment booked successfully!");
      setSelectedSlot("");
    } else {
      dispatch(bookingFail(data.message));
      setShowBookingModal(false);
      toast.error("Error: " + data.message);
    }

  } catch (error) {
    console.log(error)
    dispatch(bookingFail("Network error"));
    setShowBookingModal(false);
    toast.error("Something went wrong");
  }
};


  return (
   <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Doctor Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-xl text-blue-600 font-medium mb-3">{doctor.speciality}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {/* <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-medium text-gray-900 ml-1">{doctor.rating}</span>
                  <span className="text-gray-600 ml-1">(234 reviews)</span>
                </div> */}
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-1" />
                  {doctor.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-1" />
                  {doctor.experience} years experience
                </div>
              </div>

              <div className="flex items-center text-2xl font-bold text-green-600">
                <DollarSign className="h-6 w-6" />
                {doctor.fee}
                <span className="text-base text-gray-600 ml-2">per consultation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {doctor.name}</h2>
              <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <GraduationCap className="h-6 w-6 mr-2 text-blue-600" />
                Education & Qualifications
              </h2>
              <ul className="space-y-2">
               {doctor.education.split(',').map((edu, index) => (
    <li key={index} className="flex items-start">
      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
      <span className="text-gray-700">{edu.trim()}</span>
    </li>
  ))}
              </ul>
            </div>
          </div>

          {/* Appointment Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-blue-600" />
                Book Appointment
              </h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Available Time Slots</h3>
                <div className="grid grid-cols-1 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 text-sm rounded-lg border transition-colors ${
                        selectedSlot === slot
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <div className="mb-4">
  <label className="text-sm text-gray-700">Select Date</label>
<input
  type="date"
  value={selectedDate}
  onChange={(e) => setSelectedDate(e.target.value)}
  min={new Date().toISOString().split("T")[0]}
  className="w-full p-2 border rounded-lg mt-2"
/>

</div>

              </div>

              <button
                onClick={handleBookAppointment}
                disabled={!selectedSlot || showBookingModal}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  selectedSlot && !showBookingModal
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {showBookingModal ? 'Booking...' : 'Book Appointment'}
              </button>

              {selectedSlot && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-800">
                    <strong>Selected:</strong> {selectedSlot}
                  </div>
                  <div className="text-sm text-blue-800">
                    <strong>Fee:</strong> ${doctor.fee}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment