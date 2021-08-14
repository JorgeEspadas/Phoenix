import { Redirect, Route } from "react-router-dom";

//Variables para simulacion de Login falta la creacion de UserAuth y AuthProvider
//const user = null; //Como Usuario no Logeado
const user = { id: 1, username: "Majo" }; //Como usuario Logiado

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest} /* Recibe : exact={props.exact} path={props.path} component={props.component}*/
    >
      {user ? <Component /> : <Redirect to="/Login" />}
    </Route>
  );
}
