// Modelo JS para placeholder de IES.
// Escala likert es 1 (horrible) - 5 (chingon :v)

import React, { useState } from "react";
import { Accordion, Alert } from "react-bootstrap";
import PreguntaAbierta from "./Modulos/Pregunta_Abierta";
import { preguntas } from './Data/DataIES';
import PreguntaMultiple from "./Modulos/Pregunta_Multiple";

function CuestionarioIES({ snackbar }) {

    const [respuestas, setRespuesta] = useState([]);
    const [buttonDisabled, setButton] = useState(false);
    var total = 0;

    const setProperty = (name, value, texto, extradata) => {
        var xtradata = (extradata === undefined) ? '' : extradata;
        setRespuesta({ ...respuestas, [name]: { valor: value, texto: texto, extra: xtradata } });
        if ((Object.values(respuestas).length) === total) setButton(false);
    }
    const handleSubmit = (event) => {
        // codigo para enviar el formulario
        //console.log(JSON.stringify({respuestas:[respuestas]}));
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
                                        total = total + dimension.preguntas.length;
                                        return (
                                            <div>
                                                <Accordion>
                                                    <Accordion.Item eventKey={i}>
                                                        <Accordion.Header>{dimension.titulo}</Accordion.Header>
                                                        <Accordion.Body>

                                                            {
                                                                dimension.preguntas.map((pregunta, i) => {
                                                                    switch (pregunta.modulo) {
                                                                        case "multiple":
                                                                            return <PreguntaMultiple id={pregunta.id} texto={pregunta.texto} respuestas={pregunta.respuestas} callback={setProperty} />;
                                                                        case "abierta":
                                                                            return <PreguntaAbierta modulo={pregunta} callback={setProperty} />;
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
            <div className="container d-flex justify-content-center p-5">
                <div className="d-grid gap-2 col-4 mx-auto">
                    <button className="btn btn-success btn-lg" onClick={handleSubmit} disabled={buttonDisabled}>Enviar</button>
                </div>
            </div>
            <div className="d-grid gap-2 col-4 mx-auto text-center">
                {buttonDisabled && (<>
                    <Alert variant="warning">
                        Contesta todas las preguntas para continuar.
                    </Alert>
                </>)}
            </div>
        </div >
    );
}
export default CuestionarioIES;