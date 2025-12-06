import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, UserPlus, Users,Stethoscope ,LogOut } from 'lucide-react';
import { logout } from '../../slice/authSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
   const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("dtoken"); 
    navigate("/login"); 
  };
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
    { path: '/add-doctor', label: 'Add Doctor', icon: UserPlus },
    { path: '/doctorlist', label: 'Doctors List', icon: Users },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
 <div className="p-6 border-b border-gray-200">
  <div className="flex items-center gap-3">
    <div className="p-2 bg-blue-100 rounded-lg">
      <Stethoscope className="h-6 w-6 text-blue-600" />
    </div>
    <span className="text-2xl font-bold text-gray-900">BookEase</span>
  </div>
  <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
</div>

      <nav className="p-4">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
         <button
        onClick={handleLogout}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-800 mt-4 m-10  flex items-center justify-center gap-2"
      >
         <LogOut /> Logout
      </button>
    </aside>
  );
}
