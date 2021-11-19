import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import PreguntaAbierta from "./Pregunta_Abierta";

function PreguntaMultiple({ id, texto, respuestas, callback }) {
    return (<div>
        <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={7}>
                {texto}
            </Form.Label>
            <Col sm={5}>
                {respuestas.map((res, i) => {
                    return (
                        <div>
                            {
                                (res.modulo === undefined) ? <Form.Check
                                    type="radio"
                                    label={res.texto}
                                    name={id}
                                    id={res.valor}
                                /> : <PreguntaAbierta modulo={{texto: res.texto}}/>
                            }
                        </div>
                    );
                })}
            </Col>
        </Form.Group>
    </div>
    );
}

export default PreguntaMultiple;