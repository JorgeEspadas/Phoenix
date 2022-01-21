import { Redirect, Route, useLocation } from "react-router-dom";
import useAuth from "../Components/auth/useAuth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    <Route {...rest}>
      {(auth.getRol() === 3) ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} /> // TODO: para redirigir a donde sea alaverga, y con retorno ahuevo.
      )}
    </Route>
  );
}
