import { NavLink, useHistory, useLocation } from "react-router-dom";
import useAuth from "../Components/auth/useAuth";
/*Styles*/
import LogoIcono from "../IMG/LogoIcono.svg";
import "../css/LoginPage.css";
import "animate.css";

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
    <>
      <div className="contenedorLoginPage">
        <div className="contLogin container">
          <div className=" rowLogin row g-0 ">
            <div className="LoginForm  text-center">
              <div className="animate__animated animate__bounce">
                <a className="logoPrincipal" href="/" align="center">
                  <img
                    src={LogoIcono}
                    alt=""
                    align="center"
                    style={{ width: "20%" }}
                  />
                </a>
              </div>
              <div className="form">
                <div className="form-row py-2 pt-4">
                  <div className="offset-1 col-lg-10">
                    <input
                      type="email"
                      className="inputLogin px-3"
                      placeholder="Correo Electronico"
                    />
                  </div>
                </div>
                <div className="form-row py-2">
                  <div className="offset-1 col-lg-10">
                    <input
                      type="password"
                      className="inputLogin px-3"
                      placeholder="Contraseña"
                    />
                  </div>
                </div>
                <div className="form-row py-3">
                  <div className="offset-1 col-lg-10">
                    <button class="btnLogin" onClick={handleLogin}>
                      Iniciar Sesion
                    </button>
                  </div>
                </div>
              </div>
              <div className="contactLogin text-center">
                <span>¿No tienes Cuenta? </span>
                <NavLink exact to="/Contactanos">
                  <a id="linkContactanos">Contactanos</a>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
