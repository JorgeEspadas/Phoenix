import { useHistory, useLocation } from "react-router-dom";
import React, { useContext, useState } from "react";
import {useSnackbar} from 'react-simple-snackbar';
/*Styles*/
import ImageLogin from "../Images/Principal.svg";
import "../css/LoginPage.css";
import "animate.css";
import NetworkManager from "../Backend/util/Http";
import { AuthContext } from "../Components/auth/AuthProvider";
import Util from "../Backend/util/Util";

export default function Login(){
  const auth = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const [openSnackbar] = useSnackbar(Util.snackbarConfig.options);
  const [ user, saveUser] = useState({
      email:'',
      password:''
  });

  const handleChange = e => {
    saveUser({
        ...user,
        [e.target.name]: e.target.value
    });
  }

  const handleLogin = async () => {
    if(user.email.trim() === "" || user.password.trim() === ""){
      openSnackbar('Porfavor llena todos los campos');
      return;
    }
    user.password = Util.Hash(user.password);
    console.log(user.password);
    var net = new NetworkManager();
    var response = await net.post('auth/login',user);
    console.log(response);
    if(response.response === "OK"){
      // recibimos el token, rol
      var token = response.data.token;
      var decoded = Util.decode(token);
      //hacemos set del usuario y mandamos el payload o auth.login();
      var userData = {
        'nombre' : decoded[1].nombre,
        'email' : decoded[1].email,
        'token' : token,
        'rol' : decoded[1].rol
      };
      auth.Login(userData);
      history.push(location.state?.from || "/");
    }else{
      openSnackbar('Error de Servicio');
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
                  <button className="btnLogin" onClick={handleLogin}>
                    Iniciar Sesion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}