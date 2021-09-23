import Preguntas from '../Preguntas/Preguntas';
import ReactDOM from 'react-dom';
import Signup from './Signup';

export default function AdminPage() {
  const handleClick = (e) => {
    if(e.target.value === "agregar_pregunta"){  

      ReactDOM.render(
        <Preguntas />,
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
    }else if(e.target.value === "signup"){
      ReactDOM.render(
        <Signup />,
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
        <li className="nav-item">
          <button exact to="/Signup" className="nav-link " href="#" value="signup"
          onClick={handleClick}>
            Registrar usuario
          </button>
        </li>
      </ul>
      <div id="adminContainer"></div>
    </div>
  ); /// abuebo abuebo
}
