import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useSessionTimeout from "../../hooks/useSessionTimeout";

const ProtectedRoute = () => {
  const location = useLocation();
  const { user } = useAuth();

  // 10-minute session timeout
  useSessionTimeout(10 * 60 * 1000);

  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
