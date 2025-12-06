import { Navigate } from "react-router-dom";

export default function DoctorProtected({ children }) {
  const token = localStorage.getItem("dtoken");
   
  if (!token) {
    return <Navigate to="/doctor/login" replace />;
  }

  return children;
}
