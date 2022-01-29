import React from "react";
import {Accordion} from 'react-bootstrap';

const Abierta = ({pregunta,callback, numero}) =>{
    const handleChange = e => {
        callback(e.target.name,[{texto: e.target.value}], "abierta");
    }  
    return (
        <div class="mb-2"> 
            <div class="py-2">{numero+") "+pregunta.texto}</div>
            {
                pregunta._id === "empresas_37.1" || pregunta._id === "empresas_38.1" || pregunta._id === "empresas_39.1" || pregunta._id === "empresas_40.1" || pregunta._id === "empresas_41.1" ?
                 <div><label class="px-3">{pregunta.opciones[0].texto}</label> <input class="col-md-1" type="number"  name={pregunta._id} onChange={handleChange}></input></div>
                :
                <div><label class="px-3">{pregunta.opciones[0].texto}</label> <input type="text"  name={pregunta._id} onChange={handleChange}></input></div>
            }
                
        </div>
    )
}

export default Abierta;