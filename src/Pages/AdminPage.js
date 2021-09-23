import AgregarPregunta from '../Preguntas/AgregarPregunta';
import UserEditor from '../Components/Admin/Usuarios';
import ReactDOM from 'react-dom';
import {useSnackbar} from 'react-simple-snackbar';
import Util from '../Backend/util/Util';

export default function AdminPage() {
  const [open] = useSnackbar(Util.snackbarConfig.options);
  
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
        <UserEditor snackbar={open}/>,
        document.getElementById('adminContainer'))
    }else if(e.target.value === "signup"){
      ReactDOM.render(
        <Signup />,
        document.getElementById('adminContainer'))
    }
  }


  return (
    <div className="col pt-4">
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
<<<<<<< HEAD
=======
        <li className="nav-item">
          <button exact to="/Signup" className="nav-link " href="#" value="signup"
          onClick={handleClick}>
            Registrar usuario
          </button>
        </li>
>>>>>>> 7114c858581514492d000399560bbab136099e6f
      </ul>
      <div id="adminContainer"></div>
    </div>
  ); /// abuebo abuebo
}
