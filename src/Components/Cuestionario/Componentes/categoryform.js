import React from "react";
import { Accordion } from 'react-bootstrap';

function CategoryForm({titulo, preguntas}){
    return (
        <Accordion>
            <Accordion.Item>
                <Accordion.Header>{titulo}</Accordion.Header>
                <Accordion.Body>
                    {
                        preguntas.map((pregunta, i)=>{
                            return <p>{pregunta.texto}</p>
                        })
                    }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default CategoryForm;