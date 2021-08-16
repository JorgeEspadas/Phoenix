import { NavLink, useHistory, useLocation } from "react-router-dom";
import useAuth from "../Components/auth/useAuth";

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const previusLocation = location.state?.from; //Trae la Url de la pagina Anterior.

  const auth = useAuth();
  const handleLogin = () => {
    auth.Login();
    history.push(previusLocation || "/");
  };

  return (
    <div>
      <h1>Iniciar Sesion</h1>

      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div>
      <button class="btn btn-primary" onClick={handleLogin}>
        Iniciar Session
      </button>
      <NavLink exact to="/Signup" title="Iniciar Sesion">
        <p>Registrate</p>
      </NavLink>
    </div>
  );
}
