import React, {useState,useEffect} from "react";
import { Accordion } from "react-bootstrap";

const Tabla = ({pregunta, callback, numero}) => {
    const [ opciones , setOpciones ] = useState([]);

    useEffect( () => {
        let op = [];
        pregunta.opciones.map( (opcion, i) =>{
            op.push({
                _id: opcion.opcion_id.toString(),
                texto:opcion.texto,
                valor:""
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
        callback(e.target.name,op,"tabla");
    } 
    return (

        <div class="mb-2">
            <div class="py-2">{numero+") "+pregunta.texto}</div>
             {
                pregunta.opciones.map( (opcion, i) =>{
                    return <div key={i} class="py-1"><label class="px-sm-3 col-lg-3 col-sm-6 col-12">{opcion.texto}</label> <input class="col-lg-1 col-sm-2 col-6" type="number" id={opcion.opcion_id} name={pregunta._id}  onChange={handleChange}></input></div>
                })
            }
        </div>
    )
}

export default Tabla;