import React from "react";
import AgregarPregunta from "./components/AgregarPregunta";
import ReactDOM from "react-dom";

const Preguntas = () => {
    const handleClick = (e) => {
        switch(e.target.value){
            case 'add':
                ReactDOM.render(
                    <AgregarPregunta />,
                    document.getElementById('editorContainer')
                 ); 
            break;
            case 'modificar':
                
            break;
            default:
                ReactDOM.render(
                    <p>Selecciona alguna opcion :D</p>,
                    document.getElementById('editorContainer')
                    ); 
            break;
        }
    }
    return(
        <div className="container-fluid">
            <div className="row">
                <div className='col-2'>
                <center>
                    <ul className="nav nav-tabs flex-column" style={{'border-bottom' : '0px'}}>
                        <li className="nav-item">
                            <button className="nav-link" href="#" onClick={handleClick} value="add">
                                Agregar
                            </button>
                            <button className="nav-link" href="#" onClick={handleClick} value="modificar">
                                Modificar
                            </button>
                        </li>
                    </ul>
                </center>
                </div>
                <div className="col-10">
                    <div className="container-fluid">
                        <div id="editorContainer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preguntas;