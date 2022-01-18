import React from "react";
import {Accordion} from 'react-bootstrap';

const Abierta = ({pregunta,indice,callback}) =>{
    const handleChange = e => {
        callback(e.target.name,{abierta:true, texto: e.target.value});
    }  
    return (
        <div class="mb-2"> 
            <div class="py-2">{pregunta.texto}</div>
                <div><label class="px-3">{pregunta.opciones[0].texto}</label> <input type="text"  name={pregunta._id} onChange={handleChange}></input></div>
        </div>
    )
}

export default Abierta;