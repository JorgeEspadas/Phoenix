import AgregarPregunta from '../Preguntas/AgregarPregunta';
import UserEditor from '../Components/Admin/Usuarios';
import ReactDOM from 'react-dom';

export default function AdminPage() {
  
  const handleClick = (e) => {
    if(e.target.value === "agregar_pregunta"){  
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
        <UserEditor/>,
        document.getElementById('adminContainer'))
    }
  }


  return (
    <div>
    <div style={{ padding: "2%", }}>
      <h1>Administrador</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className="nav-link " aria-current="page" href="#"
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
      </ul>
      <div id="adminContainer"></div>
    </div>
    </div>
  ); /// abuebo abuebo
}
