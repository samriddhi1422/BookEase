import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  const localToken = localStorage.getItem("token");


  if (!token && !localToken) {
    return <Navigate to="/login" replace />;
  }


  return children;
}
