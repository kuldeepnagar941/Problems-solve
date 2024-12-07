
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({pro}) => {
  const token = localStorage.getItem("token");

  
  return token ? pro : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
