// Modelo JS para placeholder de IES.
// Escala likert es 1 (horrible) - 5 (chingon :v)

import React, { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import PreguntaAbierta from "./Modulos/Pregunta_Abierta";
import { preguntas } from './Data/DataIES';
import PreguntaMultiple from "./Modulos/Pregunta_Multiple";

function CuestionarioIES({ snackbar }) {

    const [respuestas, setRespuesta] = useState({});

    const handleChange = (event) => {
        console.log(event.target.value);
    }

    const handleSubmit = (event) => {

    }

    return (
        <div>
            {
                preguntas.map((seccion, i) => {
                    return (
                    <div>
                       <h1> {seccion.header} </h1>
                       <div>
                           {
                               seccion.indicadores.map((dimension, i) => {
                                   return (
                                       <div>
                                           <Accordion>
                                               <Accordion.Item eventKey={i}>
                                                   <Accordion.Header>{dimension.titulo}</Accordion.Header>
                                                   <Accordion.Body>
                                                       {
                                                           dimension.preguntas.map((pregunta, i) => {
                                                               switch(pregunta.modulo){
                                                                   case "multiple":
                                                                       return <PreguntaMultiple id={pregunta.id} texto={pregunta.texto} respuestas={pregunta.respuestas}/>;
                                                                   case "abierta":
                                                                       return <PreguntaAbierta modulo={pregunta}/>;
                                                               }
                                                           })
                                                       }
                                                   </Accordion.Body>
                                               </Accordion.Item>
                                           </Accordion>
                                       </div>
                                   );
                               })
                           }
                       </div>
                    </div>
                    );
                })
            }
        </div >
    );
}
export default CuestionarioIES;