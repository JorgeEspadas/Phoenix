import React from "react";
import { SidebarData } from "./SidebarData";
import Login from "../../Pages/Login";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HandIcon from "@material-ui/icons/PanTool";
import LogoNombre from "../../IMG/LogoNombre.svg";
import LogoIcono from "../../IMG/LogoIcono.svg";
import useAuth from "../auth/useAuth";

const Sidebar = () => {
  const auth = useAuth();
  const username = "Juan Carlo"; //Estatico por ahora

  //======= Validaciones del Modal de Login======
  const [show, setShow] = useState(false); //Estado Incial
  //Cambios de Estado.
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-color d-flex sticky-top">
      <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-1 pb-1">
        <br />
        {/* ========= Primera Parte: Imagen de la Pagina ========= */}
        <div class=" align-items-center flex-shrink-1" align="center">
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
        {/* ========= Segunda Parte: Modulos del Sidebar ========= */}
        <ul
          className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
          id="menu"
        >
          <>
            {SidebarData.map((val, key) => {
              return (
                <li className="nav-item flex-column">
                  <a
                    key={key}
                    href={val.Link}
                    className="nav-link  px-sm-0 px-2"
                  >
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
                <li className="nav-item">
                  <a href="/Encuestas" className="nav-link px-sm-0 px-2">
                    <i className="fa fa-file-text"></i>
                    <span className="ms-1 d-none d-sm-inline">Encuestas</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/Administrador" className="nav-link px-sm-0 px-2">
                    <i className="fa fa-cog"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Administrador
                    </span>
                  </a>
                </li>
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
                  onClick={handleShow}
                />
                <Modal
                  show={show}
                  onHide={handleClose}
                  size="md"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="modalTittle">Inicio de Sesion</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Login></Login>
                  </Modal.Body>
                </Modal>
              </>
            )}
            {/* ========= Con la sesion Iniciada ========= */}
            {auth.isLogged() && (
              <Dropdown>
                <Dropdown.Toggle id="">
                  <a>
                    <HandIcon
                      className="handIcon ms-1 d-none d-sm-inline"
                      fontSize="small"
                    />
                    <span className="username ms-1 d-none d-sm-inline">
                      Hola {username}!
                    </span>
                  </a>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    Cambiar Contraseña
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={auth.Logout}>
                    Cerrar Sesion
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
