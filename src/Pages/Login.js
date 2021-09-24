import { useHistory, useLocation, NavLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import {useSnackbar} from 'react-simple-snackbar';
/*Styles*/
import LogoIcono from "../Images/LogoIcono.svg";
import "../css/LoginPage.css";
import "animate.css";
import NetworkManager from "../Backend/util/http";
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
    if(response.response === "OK"){
      // recibimos el token, rol
      var token = response.data.token;
      var decoded = Util.decode(token);
      //hacemos set del usuario y mandamos el payload o auth.login();
      var userData = {
        'nombre' : decoded.nombre,
        'email' : decoded.email,
        'token' : token,
        'rol' : decoded.rol
      };
      auth.Login(userData);
      history.push(location.state?.from || "/");
    }else{
      openSnackbar('Error de Servicio');
    }
  };

  return (
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
                      name="email"
                      className="inputLogin px-3"
                      placeholder="Correo Electronico"
                      onChange={handleChange}
                      value={user.email}
                    />
                  </div>
                </div>
                <div className="form-row py-2">
                  <div className="offset-1 col-lg-10">
                    <input
                      type="password"
                      name="password"
                      className="inputLogin px-3"
                      placeholder="Contraseña"
                      onChange={handleChange}
                      value={user.password}
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
  );
}