import AgregarPregunta from '../Preguntas/AgregarPregunta';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import NetworkManager from "../Backend/util/http";
import { useEffect } from 'react';

export default function AdminPage() {
  var categories;
  var secciones = [];

  var net = new NetworkManager();

  const recibirCategorias = async () => {
    var response = await net.globalGet('/admin/categorias'); 
    console.log(response);
    var rawData = await response.data.data;

    categories = rawData;

    //id categoria es el nombre de la seccion
    //contiene categorias

        for(var i in rawData){
            await secciones.push(
                <option value={i} key={rawData[i].id_categoria} name={rawData[i].id_categoria}
                >{rawData[i].id_categoria}</option>
            );
        }
        //ReactDOM.render(secciones, document.getElementById('selectSecciones'));
    }

    useEffect ( () => {
      // El useEffect recibe un parametro vacio o con alguna dependencia (como por ejemplo ajustar valores de retorno)
      // Si no se tiene un parametro indicador al final ([]) esto refrescara el estado y rerenderizara la pantalla. pendejo.
      recibirCategorias();
  }, []);
  const handleClick = (e) => {
    if(e.target.value==="agregar_pregunta"){  
      ReactDOM.render(
        <AgregarPregunta  secciones={secciones} categories={categories}/>,
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
