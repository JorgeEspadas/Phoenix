import React, {useState} from "react";
import { ButtonGroup,Button,Accordion } from "react-bootstrap";
import { preguntas_empresas } from "./DatosEmpresas";

const EmpresasForm = () => {
    const [ respuestas , setRespuestas ] = useState();

    

    const handleCambiarSeccion = (e) => {
       
    }
    return (
        <div>
            <Accordion defaultActiveKey="0">
                {
                     preguntas_empresas.map((categoria,i) => {
                        return <Accordion.Item eventKey={i} name={i} key={categoria.categoria}>
                            <Accordion.Header>{categoria.categoria}</Accordion.Header>
                            <Accordion.Body>
                                <Accordion defaultActiveKey="0">
                                {
                                 categoria.preguntas.map((pregunta,i) =>{
                                        return  <Accordion.Item eventKey={i} key = {pregunta._id}>
                                                        <Accordion.Header>{pregunta.texto}</Accordion.Header>
                                                        <Accordion.Body>
                                                            {
                                                                pregunta.opciones.map((opcion, i) => {
                                                                    switch(pregunta.tipo){
                                                                        case "multiple":
                                                                            return <div key={i}><label><input type="checkbox"/> {opcion.texto}</label></div>
                                                                            break;
                                                                        case "abierta":
                                                                            return <div  key={i}><label>{opcion.texto}</label> <input type="text"></input></div>
                                                                            break;
                                                                        case "tabla":
                                                                            return <div  key={i}><label>{opcion.texto}</label> <input type="text"></input></div>
                                                                            break; 
                                                                        case "rango":
                                                                            if(i === 1){
                                                                                let rango =[];
                                                                                let inicio = parseInt(pregunta.opciones[0].texto,10);
                                                                                let fin = parseInt(opcion.texto,10);
                                                                                for(let i = fin; i > inicio; i--){
                                                                                    rango.push(i);
                                                                                }
                                                                                return <div key={i}><select>
                                                                                    {
                                                                                        rango.map( (r) =>{
                                                                                            return <option value={r} key={r}>{r}</option>
                                                                                        })
                                                                                    }
                                                                                </select></div>
                                                                            }
                                                                            break;                                                       
                                                                    }
                                                                })
                                                            }
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                            
                                    })
                                }
                                 </Accordion>
                            </Accordion.Body>
                    </Accordion.Item>
                    })
                }
                
            </Accordion>
        </div>

    )
}

export default EmpresasForm;