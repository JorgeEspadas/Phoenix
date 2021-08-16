import { Redirect, Route, useLocation } from "react-router-dom";
import useAuth from "../Components/auth/useAuth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    <Route {...rest}>
      {auth.user ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
}
