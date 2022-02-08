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

  const logout = () =>{
    auth.Logout();
    history.push('/');
  }

  return (
    <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-color d-flex sticky-top">
      <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-1 pb-1">
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
              className="d-none d-sm-inline"
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
          className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
          id="menu"
        >
          <>
            {SidebarData.map((val, key) => {
              return (
                <li className="nav-item flex-column" key={key}>
                  <a href={val.Link} className="nav-link  px-sm-0 px-2">
                    <i className={val.Icono}></i>
                    <span className="ms-1 d-none d-sm-inline">
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
                    <a href="/Administrador" className="nav-link px-sm-0 px-2">
                      <i className="fa fa-cog"></i>
                      <span className="ms-1 d-none d-sm-inline">
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
        <div className="dropdown align-self-center show py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
          <>
            {" "}
            {/* ========= Cuando aun no se Inicia Sesion ========= */}
            {!auth.isLogged() && (
              <>
                <AccountCircleIcon
                  className="InicioSesionIcono px-sm-0 px-1"
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
                    <span className="username ms-1 d-none d-sm-inline">
                      Mi Perfil
                    </span>
                  </a>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logout}>
                    Cerrar Sesión
                  </Dropdown.Item>
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
