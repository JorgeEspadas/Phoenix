import React, {useState} from "react";
import { Accordion } from "react-bootstrap";
import { preguntas_empresas } from "./DatosEmpresas";
import Multiple from "./tipos/Multiple";
import Rango from "./tipos/Rango";
import Abierta from "./tipos/Abierta";
import Tabla from "./tipos/Tabla";

const EmpresasForm = () => {

    const [respuestas, setRespuesta] = useState([]);

    const setProperty = (name, value) => {
        setRespuesta({...respuestas, [name]: {valor:value}});
    }

    const handleEnviar = e => {

    }
    return (
        <div>
            <Accordion defaultActiveKey="0">
                {
                     preguntas_empresas.map((categoria,i) => {
                        return <Accordion.Item eventKey={i} name={i} key={categoria.categoria}>
                            <Accordion.Header>{categoria.categoria}</Accordion.Header>
                            <Accordion.Body>
                               
                                {
                                    categoria.preguntas.map((pregunta,i) =>{
                                        switch(pregunta.tipo){
                                            case "multiple":
                                                return <Multiple pregunta={pregunta} indice={i} callback={setProperty}/>
                                                break;
                                            case "abierta":
                                                return <Abierta pregunta={pregunta} indice={i} callback={setProperty}/>
                                                break;
                                            case "tabla":
                                                return <Tabla pregunta={pregunta} indice={i} callback={setProperty}/>
                                                break; 
                                            case "rango":
                                                return <Rango pregunta={pregunta} indice={i} callback={setProperty}/>
                                            break;                                                       
                                        }
                                    })
                                }
                            </Accordion.Body>
                    </Accordion.Item>
                    })
                }
                
            </Accordion>
            <button type="button" class="btn btn-primary my-4" onClick={handleEnviar}>Enviar</button>
        </div>

    )
}

export default EmpresasForm;