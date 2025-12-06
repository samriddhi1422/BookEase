import React from "react";

function DoctorCard({ doctor ,onToggle}) {
  return (
    <div
  className="
    bg-white rounded-xl sm:rounded-2xl shadow-sm border-b-4 sm:border-b-6 border-blue-400 p-3 sm:p-4 md:p-6  hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center gap-2 sm:gap-3 md:gap-4
  "
>
  {/* Doctor Image */}
  <div
    className="
      w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md
      ring-2 ring-blue-200
    "
  >
    <img
      src={doctor.image || "/default-doctor.png"}
      alt={doctor.name}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Info */}
  <div className="text-center space-y-0.5 sm:space-y-1">
    <h3 className="text-sm sm:text-base md:text-xl font-semibold text-gray-800">
      {doctor.name}
    </h3>
    <p className="text-xs sm:text-sm text-blue-600 font-medium">
      {doctor.speciality}
    </p>
  </div>

  {/* Availability */}
  <div className="mt-1 sm:mt-2 flex items-center justify-center gap-2">
    <input
      type="checkbox"
      checked={doctor.available}
      onChange={onToggle}
      className="h-3.5 w-3.5 sm:h-4 sm:w-4 accent-green-600 cursor-pointer"
    />
    <label className="text-xs sm:text-sm text-gray-600 font-medium">
      <span>{doctor.available ? "Available" : "Unavailable"}</span>
    </label>
  </div>
</div>

  );
}

export default DoctorCard;

