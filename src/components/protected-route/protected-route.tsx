import { useLocation, Navigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";

interface ProtectedRouteProps {
  anonymous: boolean;
  children: JSX.Element;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  const { anonymous, children } = props;
  const location = useLocation();
  const state = location.state as { from: Location };
  const fromPage = state?.from?.pathname || "/";
  const context = useCurrentUser();

  if (!anonymous && !context.currentUser.loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (anonymous && context.currentUser.loggedIn) {
    return <Navigate to={fromPage} />;
  }

  return children;
};

export default ProtectedRoute;