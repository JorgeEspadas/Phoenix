import { NavLink, useHistory, useLocation } from "react-router-dom";
import React, { useState, useRef } from "react";
import useAuth from "../Components/auth/useAuth";
import Snack_Bar from "../Components/layout/Snack_Bar";
/*Styles*/
import ImageLogin from "../IMG/Principal.svg";
import "../css/LoginPage.css";
import "animate.css";
import NetworkManager from "../Backend/util/http";

export default function Login() {
  const sbr = useRef(null);

  const [ user, saveUser] = useState({
      email:'',
      password:''
  });

  const [message, setMessage ] = useState({
    msg:  '',
    type: '',
    duration:0
  });

  const handleChange = e => {
    saveUser({
        ...user,
        [e.target.name]: e.target.value
    });
}

  const history = useHistory();
  const location = useLocation();
  const previusLocation = location.state?.from; //Trae la Url de la pagina Anterior.

  const auth = useAuth();
  const handleLogin = async () => {
    if(user.email.trim() === "" || user.password.trim() === ""){
      if(message) sbr.current.showMessage();       
      setMessage({
        msg:'Todos los campos son obligatorios',
        type:"error",
        duration:2000
      });
      return;
    }

    var net = new NetworkManager();
    var response = await net.globalPost('auth/login',user);
    var body = response.data;
    console.log(response);

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
      history.push(previusLocation || "/");
    }else{
      if(message) sbr.current.showMessage();       
      setMessage({
        msg: body.data.exception.message,
        type:"error",
        duration:2000
      });
    }
    
  };

  return (
    <div className="contenedorLoginPage">
      <div className="container">
        <div className=" rowLogin row g-0 ">
          <div className="loginContenedorImagen col-lg-5">
            <img id="imgLogin" src={ImageLogin} alt="" />
          </div>
          <div className="LoginForm col-lg-7 text-center py-5">
            <h1 className="animate__animated animate__bounce">Welcome Back</h1>
            <div className="form">
              <div className="form-row py-3 pt-4">
                <div className="offset-1 col-lg-10">
                  <input
                    type="email"
                    className="inputLogin px-3"
                    placeholder="Correo Electronico"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row py-3">
                <div className="offset-1 col-lg-10">
                  <input
                    type="password"
                    className="inputLogin px-3"
                    placeholder="Contraseña"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
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
            <div className="text-center">
              <span>¿No tienes Cuenta? </span>
              <NavLink exact to="/Signup">
                <a>Registrate</a>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {message &&
        <Snack_Bar
          ref={sbr}
          message={message.msg}
          type={message.type}
          duration={message.duration}
          />
            }
    </div>
  );
}
