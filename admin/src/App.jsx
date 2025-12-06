import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import AddDoctor from './pages/AddDoctor'
import Appointments from './pages/Appointments'
import DoctorList from './pages/DoctorList'
import Sidebar from './components/Sidebar';
import { LogIn } from 'lucide-react';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer, toast } from 'react-toastify';
import DoctorProtected from './DoctorProtected';
import DoctorDashboard from '../Doctor/DoctorDashboard';
import Doctorprofie from '../Doctor/Doctorprofie';
import DoctorAppointmnets from '../Doctor/DoctorAppointmnets';
import DocBar from './components/DocBar';

function App() {
  

  return (
  <>
   <ToastContainer position="top-right" autoClose={2000} />
   
  <Router>
      <Routes>
        
        <Route path="/login" element={<Login /> } />
       

   
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50 w-full flex flex-col md:flex-row">
  <Sidebar />
  <div className="flex-1 w-full p-3 md:p-6 mt-5 md:mt-0">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add-doctor" element={<AddDoctor />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/doctorlist" element={<DoctorList />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
     
        <Route
        path="/doctor/*"
        element={
         <DoctorProtected>
        
      <div className="min-h-screen bg-gray-50 w-full flex flex-col md:flex-row">

       
        <DocBar />

      
        <div className="flex-1 w-full p-3 md:p-6 mt-2 md:mt-0">
                  <Routes>
                    <Route path="/dashboard" element={<DoctorDashboard />} />
                    <Route path="/profile" element={<Doctorprofie />} />
                    <Route path="/doctorappointments" element={<DoctorAppointmnets/>} />
                    
                  </Routes>
                </div>
              </div>
         </DoctorProtected>
        }/>
         
      </Routes>
    </Router> 
  </>
  )
}

export default App
