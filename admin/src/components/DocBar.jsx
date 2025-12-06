import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  UserPlus,
  Stethoscope,
  LogOut,
} from "lucide-react";
import { logout } from "../../slice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DocBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("dToken");
    navigate("/login");
  };

  const menuItems = [
    { path: "/doctor/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/doctor/doctorappointments", label: "Appointments", icon: Calendar },
    { path: "/doctor/profile", label: "Profile", icon: UserPlus },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden w-full bg-white  shadow-sm p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Stethoscope className="h-5 w-5 text-blue-600" />
          </div>
          <span className="font-semibold text-gray-900">BookEase</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm bg-blue-500 text-white px-2 py-1 rounded-md"
        >
          <LogOut size={10} /> Logout
        </button>
      </div>

      {/*  MOBILE TOP MENU LINKS */}
      <div className="md:hidden flex justify-around bg-white  p-2 mb-0">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>

      {/* ✅ ✅ DESKTOP SIDEBAR ONLY */}
      <aside className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Stethoscope className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">BookEase</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Doctor Panel</p>
        </div>

        <nav className="p-4">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-800 mt-6 mx-10 flex items-center justify-center gap-2"
        >
          <LogOut /> Logout
        </button>
      </aside>
    </>
  );
}
