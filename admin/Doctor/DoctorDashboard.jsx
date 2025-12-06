import React, { useEffect, useState } from "react";
import { Users, Calendar, Stethoscope } from "lucide-react";
 import imgUser from '../src/assets/default.png'

function DoctorDashboard() {
  const token = localStorage.getItem("dtoken");
  
    const [stats, setStats] = useState({
      completed:0,
      patients: 0,
      appointments: 0,
    });
  
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };
  
   
  
    const fetchDashboard = async () => {
      try {
        const res = await fetch("https://bookease-backend-ju5w.onrender.com/api/doctor/getappointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
        const list = data.appointments || data.data || [];
  
        setAppointments(list);
  
      
      } catch (error) {
        console.log("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchStats = async () => {
    try {
      const res = await fetch("https://bookease-backend-ju5w.onrender.com/api/doctor/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
  
      if (data.success) {
        setStats({
          appointments: data.stats.totalAppointments,
  
  completed: data.stats.completedAppointments,
  patients: data.stats.totalPatients,

        });
      }
    } catch (error) {
      console.log("Stats fetch error:", error);
    }
  };
  
  
    useEffect(() => {
      fetchDashboard();
      fetchStats();
    }, []);
  
    
    const upcomingAppointments = appointments.filter(
      (apt) => !apt.cancelled && !apt.isCompleted
    );
  
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          Loading dashboard...
        </div>
      );
    }
  return (
    <div className="w-full">
  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-8">
    Dashboard
  </h1>

  {/* Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-3 mb-6 md:mb-8">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="flex items-center gap-4">
        <div className="p-2 md:p-2 bg-blue-50 rounded-lg">
          <Stethoscope className="text-blue-600" size={20} />
        </div>
        <div>
          <p className="text-gray-500 text-xs md:text-sm">
            Total Appointments
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">
            {stats.appointments}
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
      <div className="flex items-center gap-4">
        <div className="p-2 md:p-2 bg-blue-50 rounded-lg">
          <Users className="text-blue-600" size={20} />
        </div>
        <div>
          <p className="text-gray-500 text-xs md:text-sm">Total Patients</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">
            {stats.patients}
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 ">
      <div className="flex items-center gap-4">
        <div className="p-2 md:p-2 bg-blue-50 rounded-lg">
          <Calendar className="text-blue-600" size={20} />
        </div>
        <div>
          <p className="text-gray-500 text-xs md:text-sm">
            Completed Appointments
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">
            {stats.completed}
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* ✅ Upcoming Appointments */}
  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    <div className="p-4 md:p-6 border-b border-gray-200">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        Upcoming Appointments
      </h2>
    </div>

    <div className="p-4 md:p-6">
      {upcomingAppointments.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No upcoming appointments
        </p>
      ) : (
        <div className="space-y-3 md:space-y-4">
          {upcomingAppointments.slice(0, 15).map((apt) => (
            <div
              key={apt._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 md:p-4 border border-gray-300 rounded-xl"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <img
                  src={apt.userData?.image || imgUser}
                  onError={(e) => (e.currentTarget.src = imgUser)}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-sm md:text-base text-gray-800">
                    {apt.userData?.name}
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm font-medium text-gray-800">
                  {formatDate(apt.slotDate)}
                </p>
                <p className="text-xs text-gray-500">
                  {apt.slotTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>

  )
}

export default DoctorDashboard