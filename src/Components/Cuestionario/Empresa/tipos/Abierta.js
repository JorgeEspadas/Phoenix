import React from "react";
import {Accordion} from 'react-bootstrap';

const Abierta = ({pregunta,callback, numero}) =>{
    const handleChange = e => {
        callback(e.target.name,[{abierta:true, texto: e.target.value}]);
    }  
    return (
        <div class="mb-2"> 
            <div class="py-2">{numero+") "+pregunta.texto}</div>
            {
                pregunta._id === "empresas_37_1" || pregunta._id === "empresas_38_1" || pregunta._id === "empresas_39_1" || pregunta._id === "empresas_40_1" || pregunta._id === "empresas_41_1" ?
                 <div><label class="px-3">{pregunta.opciones[0].texto}</label> <input class="col-md-1" type="number"  name={pregunta._id} onChange={handleChange}></input></div>
                :
                <div><label class="px-3">{pregunta.opciones[0].texto}</label> <input type="text"  name={pregunta._id} onChange={handleChange}></input></div>
            }
                
        </div>
    )
}

export default Abierta;