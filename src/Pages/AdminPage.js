import { useState } from "react";
import UserEditor from "../Components/Admin/Usuarios";
import { useSnackbar } from "react-simple-snackbar";
import Util from "../Backend/util/Util";
import "../css/AdminPage.css";
import ConfigEditor from "../Components/AdminConfig/Configuracion";
import ResultViewer from "../Components/Admin/components/Resultados";

export default function AdminPage() {
  const [open] = useSnackbar(Util.snackbarConfig.options);
  const [pantallaActual, setPantalla] = useState(2);

  const handleClick = (e) => {
    if (e.target.value === "resultados") {
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
        return <ResultViewer snackbar={open}/>;
      case 2:
        return <ConfigEditor snackbar={open} />;
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
            href="/#"
            onClick={handleClick}
            value="config"
          >
            Configuración
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link "
            href="/#"
            onClick={handleClick}
            value="usuario"
          >
            Encuestas
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link "
            href="/#"
            onClick={handleClick}
            value="resultados"
          >
            Resultados
          </button>
        </li>
      </ul>
      <>{moduleRender(pantallaActual)}</>
    </div>
  );
}
