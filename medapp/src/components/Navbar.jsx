import React, { useState } from "react";
import profile from "../assets/defualt.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Stethoscope, ChevronDown, Menu, X } from "lucide-react";
import { logout } from "../slice/authSlice";
import { useDispatch,useSelector } from "react-redux";
import { UserCircle } from "lucide-react";





function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
 const { token } = useSelector((state) => state.auth);


  const isActive = (path) => location.pathname === path;
const dispatch = useDispatch();
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/doctors", label: "All Doctors" },
    { path: "/about", label: "About" },
    
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Stethoscope className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">BookEase</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
             <a
  href="https://bookease-admin.onrender.com"
  target="_blank"
  rel="noopener noreferrer"
  className=" hover:text-blue-600 cursor-pointer transition-colors duration-200 block text-sm border-1 border-gray-600 rounded-4xl px-3 py-1"
>
  Admin Panel
</a>
          </div>
        

          {/* Desktop User Actions */}
          {token ? (
           <div
  className="hidden md:flex items-center space-x-2 relative group"
  onMouseEnter={() => setMenu(true)}
  onMouseLeave={() => setMenu(false)}
>
 <UserCircle
  className="h-10 w-10 text-gray-600 cursor-pointer hover:text-blue-600 transition"
  onClick={() => navigate("/profile")}
/>

  <ChevronDown
    className={`h-4 w-4 text-gray-600 transition-transform duration-200 ${
      showMenu ? "rotate-180" : "rotate-0"
    }`}
  />

  {/* Dropdown Menu */}
  <div
    className={`absolute right-0 mt-40 p-4 w-48 bg-blue-50 border border-gray-200 rounded-lg shadow-lg text-gray-700 text-sm font-medium z-50 transition-all duration-200 transform ${
      showMenu
        ? "opacity-100 translate-y-0 visible"
        : "opacity-0 -translate-y-2 invisible"
    }`}
  >
    <p
      onClick={() => navigate("/profile")}
      className="mt-1 hover:text-blue-600 cursor-pointer transition-colors duration-200"
    >
      My Profile
    </p>
    <p
      onClick={() => navigate("/myappointments")}
      className="mt-2 hover:text-blue-600 cursor-pointer transition-colors duration-200"
    >
      My Appointments
    </p>
    <p
      onClick={() => {
                    
                    dispatch(logout())
                     navigate("/login");
                  }}
      className="mt-2 hover:text-blue-600 cursor-pointer transition-colors duration-200"
    >
      Logout
    </p>
  </div>
</div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 text-gray-50 bg-blue-600 rounded-xl hover:bg-blue-500 transition duration-150 ease-in-out hidden md:block"
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner">
          <div className="flex flex-col space-y-2 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenu(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
              
            ))}
             <a
  href="https://bookease-admin.onrender.com"
  target="_blank"
  rel="noopener noreferrer"
  className=" hover:text-blue-600 cursor-pointer transition-colors duration-200 block text-sm border-1 border-gray-600 rounded-4xl px-3 py-1"
>
  Admin Panel
</a>

            {token ? (
              <div className="border-t border-gray-200 mt-3 pt-3 flex flex-col space-y-2">
                <p
                  onClick={() => {
                    navigate("/profile");
                    setMobileMenu(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/myappointments");
                    setMobileMenu(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    
                    dispatch(logout())
                    setMobileMenu(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenu(false);
                }}
                className="px-4 py-2 mt-2 text-gray-50 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
