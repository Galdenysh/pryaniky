import { useLocation, Navigate } from "react-router-dom";
import { userData } from "../../utils/mock-api";

interface ProtectedRouteProps {
  anonymous: boolean;
  children: JSX.Element;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const { anonymous, children } = props;
  const location = useLocation();
  const state = location.state as { from: Location };
  const fromPage = state?.from?.pathname || "/";

  if (!anonymous && !userData.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (anonymous && userData.loggedIn) {
    return <Navigate to={fromPage} />;
  }

  return children;
};

export default ProtectedRoute;