import { Redirect, Route} from "react-router-dom";
import useAuth from "../Components/auth/useAuth";

export default function PublicRoute({ component: Component, ...rest }) {
  const auth = useAuth();

  return (
    <Route {...rest}>{!auth.user ? <Component /> : <Redirect to="/" />}</Route>
  );
}
