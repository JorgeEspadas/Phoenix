import AgregarPregunta from '../Preguntas/AgregarPregunta';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

export default function AdminPage() {
  
  const handleClick = (e) => {
    if(e.target.value==="agregar_pregunta"){  
      ReactDOM.render(
        <AgregarPregunta />,
        document.getElementById('adminContainer')
     ); 
     
    }else if(e.target.value=== "config"){
      ReactDOM.render(
        <span></span>,
        document.getElementById('adminContainer'));
    }else if(e.target.value === "usuario"){
      ReactDOM.render(
        <span></span>,
        document.getElementById('adminContainer'))
    }
  }


  return (
    <div style={{ padding: "2%" }}>
      <h1>Administrador</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button class="nav-link " aria-current="page" href="#"
          onClick={handleClick} value="config">
            Configuracion
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link " href="#" 
          onClick={handleClick} value="usuario">
            Usuarios
          </button>
        </li>
        <li className="nav-item">
          <button exact to="/agregar-pregunta" className="nav-link " href="#" value="agregar_pregunta"
          onClick={handleClick}>
            Modificación
          </button>
        </li>
        <li class="nav-item">
          <NavLink
            exact to="/agregar-pregunta"
            className="nav-link"
            href="#"
            tabindex="-1"
            aria-disabled="true"
          >
            CRACKS
          </NavLink>
        </li>
      </ul>
      <div id="adminContainer"></div>
    </div>
  ); /// abuebo abuebo
}
