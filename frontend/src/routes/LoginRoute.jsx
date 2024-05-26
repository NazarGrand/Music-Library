import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Navigate to={location.state?.from || "/"} replace />
  ) : (
    <Outlet />
  );
};

export default LoginRoute;
