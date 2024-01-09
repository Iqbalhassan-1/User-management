import { Outlet, useLocation, Navigate } from "react-router-dom";
import useAuthContext from "../utils/hooks/useAuthContext";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { user } = useAuthContext();

  if (user && Object.keys(user).length > 0) {
    if (allowedRoles.includes(user.role)) {
      return <Outlet />;
    } else {
      // Redirect to unauthorized page if the user's role is not allowed
      return (
        <Navigate to="/page-not-found" state={{ from: location }} replace />
      );
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
