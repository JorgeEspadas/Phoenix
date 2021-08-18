import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useAuth from "../auth/useAuth";

const Sidebar = () => {
  const auth = useAuth();

  return (
    <div>
      <CDBSidebar className="Sidebar">
        <CDBSidebarHeader
          className="headerSidebar"
          prefix={<i className="fa fa-bars fa-large"></i>}
        >
          <NavLink exact to="/">
            <a className="titulo" href="#">
              INSOFTCAM
            </a>
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <>
              {SidebarData.map((val, key) => {
                return (
                  <NavLink
                    key={key}
                    className="Modulo"
                    exact
                    to={val.Link}
                    activeClassName="active"
                  >
                    <CDBSidebarMenuItem icon={val.Icono}>
                      {val.Modulo}
                    </CDBSidebarMenuItem>
                  </NavLink>
                );
              })}
              {auth.isLogged() && (
                <>
                  <NavLink
                    className="Modulo"
                    exact
                    to="/Encuestas"
                    activeClassName="active"
                  >
                    <CDBSidebarMenuItem icon="file-alt">
                      Encuestas
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    className="Modulo"
                    exact
                    to="/Administrador"
                    activeClassName="active"
                  >
                    <CDBSidebarMenuItem icon="tools">
                      Administrador
                    </CDBSidebarMenuItem>
                  </NavLink>
                </>
              )}
            </>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className="LoginFooter">
          {!auth.isLogged() && (
            <NavLink exact to="/login" title="Iniciar Sesion">
              <AccountCircleIcon
                className="InicioSesionIcono"
                fontSize="large"
              />
            </NavLink>
          )}
          {auth.isLogged() && (
            <a onClick={auth.Logout} title="Cerrar Sesion">
              <ExitToAppIcon fontSize="large" style={{ color: "white" }} />
            </a>
          )}
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
