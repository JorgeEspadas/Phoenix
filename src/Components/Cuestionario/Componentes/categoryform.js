import React from "react";
import { Accordion } from 'react-bootstrap';

function CategoryForm({titulo, preguntas, setRespuesta}){
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{titulo}</Accordion.Header>
                <Accordion.Body>
                    {
                        preguntas.map((pregunta, i)=>{
                            // aqui esta lo divertido
                            // se necesita un switch-case para determinar en base a pregunta.modulo que modulo se va a pintar
                            // a ese modulo especifico de cada pregunta se le debe pasar el setRespuesta para que pueda enviar la respuestas
                            // hasta el santisimo padre masterForm.

                            return <p>Pregunta: {pregunta.texto}, Tipo: {pregunta.modulo}</p>
                        })
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default CategoryForm;