import React from "react";
import { SidebarData } from "./SidebarData";
import Login from "../../Pages/Login";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LogoNombre from "../../Images/LogoNombre.svg";
import LogoIcono from "../../Images/LogoIcono.svg";
import useAuth from "../auth/useAuth";
import { useHistory } from "react-router-dom";

const Sidebar = () => {
  const auth = useAuth();
  const history = useHistory();

  //======= Validaciones del Modal de Login======
  const [show, setShow] = useState(false); //Estado Incial
  const handleShow = (value) => setShow(value);

  const logout = () => {
    auth.Logout();
    history.push("/");
  };

  return (
    <div className="col-12 col-md-3 col-xl-2 px-md-2 px-0 bg-color d-flex sticky-top">
      <div className="d-flex flex-md-column flex-row flex-grow-1 align-items-center align-items-md-start px-3 pt-1 pb-1">
        <br />
        {/* ========= Primera Parte: Imagen de la Pagina ========= */}
        <div className=" align-items-center flex-shrink-1" align="center">
          <a className="logoPrincipal" href="/" align="center">
            <img
              src={LogoIcono}
              alt=""
              className="rounded-circle"
              align="center"
            />
            <img
              className="d-none d-md-inline"
              src={LogoNombre}
              alt=""
              style={{ width: "70%" }}
            />
          </a>
        </div>
        <br />
        <br />
        {/* ========= Segunda Parte: Modulos del Sidebar ========= */}
        <ul
          className="nav nav-pills flex-md-column flex-row flex-nowrap flex-shrink-1 flex-md-grow-0 flex-grow-1 mb-0 justify-content-center align-items-center align-items-md-start"
          id="menu"
        >
          <>
            {SidebarData.map((val, key) => {
              return (
                <li className="nav-item flex-column" key={key}>
                  <a href={val.Link} className="nav-link  px-md-0 px-2">
                    <i className={val.Icono}></i>
                    <span className="ms-1 d-none d-md-inline">
                      {val.Modulo}
                    </span>
                  </a>
                </li>
              );
            })}
            {/* ========= Modulos que se muestran solo cuando estas logeado ========= */}
            {auth.isLogged() && (
              <>
                {auth.getRol() == 3 && (
                  <li className="nav-item">
                    <a href="/Administrador" className="nav-link px-md-0 px-2">
                      <i className="fa fa-cog"></i>
                      <span className="ms-1 d-none d-md-inline">
                        Administrador
                      </span>
                    </a>
                  </li>
                )}
              </>
            )}
          </>
        </ul>
        {/* ========= Tercera Parte: Espacio de Inicio de Sesion ========= */}
        <div className=" align-self-center show py-md-4  ms-auto ms-md-0 flex-shrink-1">
          <>
            {" "}
            {/* ========= Cuando aun no se Inicia Sesion ========= */}
            {!auth.isLogged() && (
              <>
                <AccountCircleIcon
                  className="InicioSesionIcono px-md-0 px-1"
                  fontSize="large"
                  onClick={() => {
                    handleShow(true);
                  }}
                />
                {show && <Login handleClose={handleShow}></Login>}
              </>
            )}
            {/* ========= Con la sesion Iniciada ========= */}
            {auth.isLogged() && (
              <Dropdown>
                <Dropdown.Toggle id="">
                  <a>
                    <i className="fa fa-user"></i>
                    <span className="username ms-1 d-none d-md-inline">
                      Mi Perfil
                    </span>
                  </a>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    Cambiar Contraseña
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;