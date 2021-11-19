import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function PreguntaAbierta({modulo, callback}){

    return (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="7">{modulo.texto}</Form.Label>
            <Col sm="5">
            <Form.Control onChange={callback} name={modulo.id} type="text"></Form.Control>
            </Col>
        </Form.Group>
    );
}

export default PreguntaAbierta;