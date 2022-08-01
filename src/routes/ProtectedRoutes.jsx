import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../features/authentication/contexts/AuthContext";

export const ProtectedRoutes = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );

};
