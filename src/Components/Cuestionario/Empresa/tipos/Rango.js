import React, {useEffect, useState} from "react";
import { Accordion } from "react-bootstrap";

const Rango = ({pregunta, indice, callback}) => {
    const [ rango , setRango ] = useState([]);
    
    const handleChange = e => {
        callback(e.target.name, e.target.value);
    }  

    useEffect( () =>{
        let auxRango =[];
        let inicio = parseInt(pregunta.opciones[0].texto,10);
        let fin = parseInt(pregunta.opciones[1].texto,10);

        for(let i = fin; i > inicio; i--){
            auxRango.push(i);
        }

        setRango(auxRango);
    },[]);

    return (
        <div>
            <div class="py-2">{pregunta.texto}</div>
            <div class="px-3"><select name={pregunta._id} onChange={handleChange}>
                {
                    rango.map( (r) =>{
                        return <option value={r} key={r}>{r}</option>
                    })
                }
                </select></div>
        </div>
    )
}

export default Rango;