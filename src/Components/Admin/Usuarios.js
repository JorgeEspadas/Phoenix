import React, { useState } from "react";
import ModifyUser from "./components/ModifyUser";
import CreateUser from "./components/UserCreate";
import "../../css/Usuarios.css";
import image from "../../Images/Admin-Usuario.jpg";
import KeyGenerator from "./components/TemporalKey";

function UserEditor({ snackbar }) {
  const [currentModule, setModule] = useState(0);

  const handleClick = (e) => {
    switch (e.target.value) {
      case "create":
        setModule(1);
        break;
      case "modificar":
        setModule(2);
        break;
      case "temporal":
        setModule(3);
        break;
      default:
        setModule(0);
        break;
    }
  };

  // render switchcase

  const moduleRender = (number) => {
    switch (number) {
      case 0:
        return (
          <div>
            <img src={image} style={{ width: "20rem" }}></img>
          </div>
        );
      case 1:
        return <CreateUser snackbar={snackbar} />;
      case 2:
        return <ModifyUser snackbar={snackbar} />;
      case 3:
        return <KeyGenerator snackbar={snackbar}/>;
      default:
        return <span>you should not see this message</span>;
    }
  };

  return (
    <div className="container-fluid" style={{ padding: "1rem" }}>
      <div className="row">
        <div className="col-sm-12 col-xl-2">
          <center>
            <ul className="nav nav-tabs flex-column" id="MenuUsuario">
              <li className="nav-item">
                <button
                  className="nav-link"
                  href="/#"
                  onClick={handleClick}
                  value="create"
                >
                  <i className="fa fa-plus-square"></i>
                  &nbsp; Crear Acceso
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link"
                  href="/#"
                  onClick={handleClick}
                  value="create"
                >
                  <i className="fa fa-plus-square"></i>
                  &nbsp; Resultados
                </button>
              </li>
            </ul>
          </center>
        </div>
        <div className="col-sm-12 col-xl-8">
          <div className="container">
            <>{moduleRender(currentModule)}</>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditor;
