import React, {useState,useEffect} from "react";
import { Accordion } from "react-bootstrap";

const Tabla = ({pregunta,indice, callback}) => {
    const [ opciones , setOpciones ] = useState([]);

    useEffect( () => {
        let op = [];
        pregunta.opciones.map( (opcion, i) =>{
            op.push({
                _id: opcion.opcion_id,
                texto:opcion.texto,
                valor:"0"
            });  
        });
        setOpciones(op);
    },[]);

    const handleChange = e => {
        let op = opciones;
        console.log(op);
        let indice = parseInt(e.target.id,10)-1;
        if(e.target.value.trim  () === ""){
            op[indice].valor = e.target.placeholder;
        }else{
            op[indice].valor = e.target.value;
        }
        setOpciones(op);
        callback(e.target.name,op);
    } 
    return (

        <div class="mb-2">
            <div class="py-2">{pregunta.texto}</div>
             {
                pregunta.opciones.map( (opcion, i) =>{
                    return <div key={i} class="py-1"><label class="px-3">{opcion.texto}</label> <input type="text" id={opcion.opcion_id} name={pregunta._id}  onChange={handleChange} placeholder="0"></input></div>
                })
            }
        </div>
    )
}

export default Tabla;