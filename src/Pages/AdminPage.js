import {useState} from 'react';
import Preguntas from '../Preguntas/Preguntas';
import UserEditor from '../Components/Admin/Usuarios';
import {useSnackbar} from 'react-simple-snackbar';
import Util from '../Backend/util/Util';

export default function AdminPage() {
  const [open] = useSnackbar(Util.snackbarConfig.options);
  const [pantallaActual, setPantalla] = useState(0);
  
  const handleClick = (e) => {
    if(e.target.value === "agregar_pregunta"){  
      setPantalla(0);
    }else if(e.target.value=== "config"){
      setPantalla(1);
    }else if(e.target.value === "usuario"){
      setPantalla(2);
    }
  }

  const moduleRender = (number) =>{
    switch(number){
      case 0:
        return <Preguntas/>
      case 1:
        return <span></span>
      case 2:
        return <UserEditor snackbar={open}/>
      default:
        return <span></span>
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
      </ul>
      <>
        {
          moduleRender(pantallaActual)
        }
      </>
    </div>
  ); /// abuebo abuebo
}
