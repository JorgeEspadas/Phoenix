import React, { useState } from "react";
import AgregarPregunta from "./components/AgregarPregunta";
import ReactDOM from "react-dom";
import ModificarPregunta from "./components/ModificarPregunta";

const Preguntas = ({snackbar}) => {
    const [ pantalla , setPantalla ] = useState();
    const handleClick = (e) => {
        switch(e.target.value){
            case 'add':
                setPantalla(<AgregarPregunta  snackbar={snackbar}/>)
            break;
            case 'modificar':
                setPantalla(<ModificarPregunta snackbar={snackbar}/> )
            break;
            default:
                setPantalla(<span></span>)
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
                        <div id="editorContainer">{pantalla}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preguntas;