import React, { useState, useRef } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import useAuth from "../Components/auth/useAuth";
import Snack_Bar from "../Components/layout/Snack_Bar";
import "../css/SignUpPage.css";
import ImageSignUp from "../IMG/Principal.svg";
import "animate.css";
import NetworkManager from "../Backend/util/http";

export default function Signup() {

  const history = useHistory();
  const location = useLocation();
  const previusLocation = location.state?.from; //Trae la Url de la pagina Anterior.
  const auth = useAuth();
  
  const [user, setUser] = useState({
    email: '',
    password: '',
    telefono: ''
  });
  
  const handleChange = e =>{
    setUser({
      ...user,
      [e.target.name] : e.target.value
    });
  }
  
  const handleSignup = async () => {
    // logica del registro // validacion y axios
    // TODO: insertar logica de registro

    //odio react.
    var net = new NetworkManager('http://localhost/');
    var response = await net.globalPost('auth/signup',user);
    var body = response.data;

    if(body.response === "OK"){
      // recibimos el token, rol
      var token = body.data.token;
      var rol = body.data.rol;
      //hacemos set del usuario y mandamos el payload o auth.login();
      var userData = {
        'email' : user.email,
        'token' : token,
        'rol' : rol
      };
      auth.Login(userData);
    }else{
      //MANDAS SNACKBAR.
    }
  }
  

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
                    placeholder="Telefono"
                    name="telefono"
                    value={user.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row py-2">
                <div className="offset-1 col-lg-10">
                  <input
                    type="email"
                    className="inputSignUp px-3"
                    placeholder="Correo Electronico"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row py-2">
                <div className="offset-1 col-lg-10">
                  <input
                    type="password"
                    className="inputSignUp px-3"
                    placeholder="Contraseña"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
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
                  <button class="btnSignUp" onClick={handleSignup}>Registrate</button>
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
