import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../utils/routes";

const ProtectedRoute = () => {
  const { user } = useAuth();

  //   useEffect(() => {
  //     if (user === null) {
  //       navigate(ROUTES.LOGIN, { replace: true });
  //     }
  //   }, [navigate, user]);

  return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
