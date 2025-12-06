import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {  useEffect,} from 'react';
import { Calendar, Shield, Clock, Users } from 'lucide-react';
//import { doctors } from '../assets/doctor';
import { getDoctorsData } from '../slice/doctorSlice';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const navigate = useNavigate();
   const dispatch = useDispatch();

  const { doctors, loading } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctorsData());
  }, []);
  useEffect(() => {
  console.log("Doctors updated:", doctors)
}, [doctors]);

  return (
  <>
  <div className="min-h-screen bg-gray-50">
  <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Your Health, <span className="text-blue-600">Simplified</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Book appointments with qualified healthcare professionals in just a few clicks. 
              Access quality healthcare when and where you need it.
            </p>
            <Link
              to="/doctors"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book Appointment Now
            </Link>
             
          </div>
          
        </div>
      </section>

       {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BookEase?</h2>
            <p className="text-lg text-gray-600">Experience healthcare the modern way</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Booking</h3>
              <p className="text-gray-600">Schedule appointments in seconds with our intuitive interface</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex p-3 bg-green-100 rounded-full mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Doctors</h3>
              <p className="text-gray-600">All our healthcare professionals are thoroughly verified</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex p-3 bg-purple-100 rounded-full mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Timing</h3>
              <p className="text-gray-600">Choose from available slots that fit your schedule</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex p-3 bg-orange-100 rounded-full mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Care</h3>
              <p className="text-gray-600">Connect with specialists across various medical fields</p>
            </div>
          </div>
        </div>


        {/* {top doctors} */}
            <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
          <div className="text-center mb-12" >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Doctors</h2>
            <p className="text-lg text-gray-600">Meet some of our highly qualified healthcare professionals</p>
          </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
  {doctors.slice(0, 3).map((doctor) => (
    <div
      key={doctor._id}
      onClick={()=>navigate(`/appointments/${doctor._id}`)}
      className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300 border-l-3 border-blue-600"
    >
      {/* Doctor Image */}
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-20 h-20 rounded-full object-cover"
      />

      {/* Doctor Details */}
      <div className="flex-1">
        <h2 className="text-blue-600 font-semibold text-lg">{doctor.name}</h2>
        <p className="text-blue-600 mb-1">{doctor.specialty}</p>
        

        <p className="text-gray-700 text-sm">{doctor.experience} years experience</p>
        <p className="text-green-600 font-medium mt-1">${doctor.fee}</p>
      </div>
    </div>
  ))}
   
</div>
<div className="text-center">
            <Link
              to="/doctors"
              className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              View All Doctors
            </Link>
          </div>
</div>
</section>


        {/* {ratings} */}
      </section>
        <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Verified Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-blue-200">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Specializations</div>
            </div>
          </div>
        </div>
      </section>
      </div>

      
  </>
  )
}

export default Home