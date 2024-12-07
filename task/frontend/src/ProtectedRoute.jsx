
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({pro}) => {
  const token = localStorage.getItem("token");

  // If token exists, render the protected element; otherwise, redirect to login
  return token ? pro : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
