import { useState } from "react";
import Preguntas from "../Components/Preguntas/Preguntas";
import UserEditor from "../Components/Admin/Usuarios";
import { useSnackbar } from "react-simple-snackbar";
import Util from "../Backend/util/Util";
import "../css/AdminPage.css";
import ConfigEditor from "../Components/AdminConfig/Configuracion";

export default function AdminPage() {
  const [open] = useSnackbar(Util.snackbarConfig.options);
  const [pantallaActual, setPantalla] = useState(2);

  const handleClick = (e) => {
    if (e.target.value === "preguntas") {
      setPantalla(1);
    } else if (e.target.value === "config") {
      setPantalla(2);
    } else if (e.target.value === "usuario") {
      setPantalla(3);
    }
  };

  const moduleRender = (number) => {
    switch (number) {
      case 1:
        return <Preguntas snackbar={open} />;
      case 2:
        return <ConfigEditor snackbar={open}/>;
      case 3:
        return <UserEditor snackbar={open} />;
      default:
        return <span></span>;
    }
  };

  return (
    <div id="AdminPage" className="col pt-4 px-5">
      <h1>&nbsp;&nbsp; Administrador</h1>
      <ul className="nav nav-tabs" id="MenuAdmi">
        <li className="nav-item">
          <button
            className="nav-link "
            aria-current="page"
            href="#"
            onClick={handleClick}
            value="config"
          >
            Configuracion
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link "
            href="#"
            onClick={handleClick}
            value="usuario"
          >
            Usuarios
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link "
            href="#"
            value="preguntas"
            onClick={handleClick}
          >
            Modificación
          </button>
        </li>
      </ul>
      <>{moduleRender(pantallaActual)}</>
    </div>
  ); /// abuebo abuebo
}
