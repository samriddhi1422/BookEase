
//import { doctors } from '../assets/doctor';
import React, { useState, useMemo ,useEffect,} from 'react';
import { Search, Filter } from 'lucide-react';
import Doctorcard from '../components/Doctorcard';
import { getDoctorsData } from '../slice/doctorSlice';
import { useDispatch, useSelector } from 'react-redux';


function AllDoctors() {
  const dispatch = useDispatch();

  const { doctors, loading } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getDoctorsData());
  }, []);
  useEffect(() => {
  console.log("Doctors updated:", doctors)
}, [doctors]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const specialties = useMemo(() => {
    const uniqueSpecialties = [...new Set(doctors.map(doctor => doctor.speciality))];
    return uniqueSpecialties.sort();
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === '' || doctor.speciality === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [doctors,searchTerm, selectedSpecialty]);

 
  
  return (
     <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Doctors</h1>
          <p className="text-gray-600">Find and book appointments with our qualified healthcare professionals</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Specialty Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-48"
              >
                <option value="">All Specialties</option>
                {specialties.map(speciality => (
                  <option key={speciality} value={speciality}>{speciality}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

      
        

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map(doctor => (
              <Doctorcard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No doctors found</div>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>

  )
}

export default AllDoctors