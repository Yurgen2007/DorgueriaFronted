import Cookies from "universal-cookie";
import { Navigate, Outlet } from "react-router-dom";

const cookies = new Cookies();

const ProtectedRoute = () => {
  const token = cookies.get("token");

  if (!token) {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
