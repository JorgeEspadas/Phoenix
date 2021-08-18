import { NavLink } from "react-router-dom";
import "../css/SignUpPage.css";
import ImageSignUp from "../IMG/Principal.svg";
import "animate.css";

export default function Signup() {
  return (
    <div className="contenedorSignUpPage">
      <div className="container">
        <div className=" rowSignUp row g-0 ">
          <div className="SignUpContenedorImagen col-lg-5">
            <img id="imgSignUp" src={ImageSignUp} alt="" />
          </div>
          <div className=" SignUpForm col-lg-7 text-center py-5">
            <h1 className="animate__animated animate__bounce">Registrate</h1>
            <div className="form">
              <div className="form-row py-2 pt-4">
                <div className="offset-1 col-lg-10">
                  <input
                    type="text"
                    className="inputSignUp px-3"
                    placeholder="Nombre de Empresa o Institución"
                  />
                </div>
              </div>
              <div className="form-row py-2">
                <div className="offset-1 col-lg-10">
                  <input
                    type="email"
                    className="inputSignUp px-3"
                    placeholder="Correo Electronico"
                  />
                </div>
              </div>
              <div className="form-row py-2">
                <div className="offset-1 col-lg-10">
                  <input
                    type="password"
                    className="inputSignUp px-3"
                    placeholder="Contraseña"
                  />
                </div>
              </div>
              <div className="form-row py-2">
                <div className="offset-1 col-lg-10">
                  <input
                    type="password"
                    className="inputSignUp px-3"
                    placeholder="Confirma Contraseña"
                  />
                </div>
              </div>
              <div className="form-row py-3">
                <div className="offset-1 col-lg-10">
                  <button class="btnSignUp">Registrate</button>
                </div>
              </div>
            </div>
            <div className="text-center">
              <span>¿Ya tienes Cuenta? </span>
              <NavLink exact to="/Login">
                <a>Inicia Sesion</a>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
