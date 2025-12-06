import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllDoctors from "./pages/AllDoctors";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import MyAppointment from "./pages/MyAppointment"
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <><ToastContainer position="top-right" autoClose={2000} />
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<AllDoctors />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/myappointments" element={<MyAppointment/>} />
            <Route path="/appointments/:docId" element={<Appointment/>} />
            <Route path="/login" element={<Login/>} />
           
           
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
    </>
  );
}

export default App;
