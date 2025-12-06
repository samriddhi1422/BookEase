// Doctorcard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Doctorcard({ doctor }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/appointments/${doctor._id}`)}
      className="bg-white rounded-lg border-l-6 border-blue-500 shadow-md p-4 flex items-center space-x-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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
  );
}

export default Doctorcard;
