// Modelo JS para placeholder de IES.
// Escala likert es 1 (horrible) - 5 (chingon :v)

import React, { useState } from "react";
import { Accordion, Alert } from "react-bootstrap";
import PreguntaAbierta from "./Modulos/Pregunta_Abierta";
import PreguntaMultiple from "./Modulos/Pregunta_Multiple";

function CuestionarioIES({ snackbar, data }) {

    const [respuestas, setRespuesta] = useState([]);
    const [buttonDisabled, setButton] = useState(false);
    var total = 0;
    var preguntas = data;

    const setProperty = (name, value, texto, extradata) => {
        var xtradata = (extradata === undefined) ? '' : extradata;
        setRespuesta({ ...respuestas, [name]: { valor: value, texto: texto, extra: xtradata } });
        if ((Object.values(respuestas).length) === total) setButton(false);
    }
    const handleSubmit = (event) => {
        // codigo para enviar el formulario
        //if(Object.values(respuestas).length < total) snackbar('Porfavor llena todas las respuestas');
        console.log(JSON.stringify({ respuestas: [respuestas] }));
        validateCuestionario();
    }

    const validateCuestionario = () => {
        // if respuestas['ies_6'] === 1 (respuesta es 0, por tanto necesitamos)
        // que se haya llenado ies_7 y 8.
        // Este es un ejemplo de la primera validacion, en caso de que respuestas ies_6 sea diferente de 1, borramos el nodo 7 y 8.
        if(respuestas['ies_6'] === 1 && (respuestas['ies_7'] === undefined || respuestas['ies_8'] === undefined)){
            snackbar('Contesta la Seccion 1, preguntas 7 y 8.');
            return false;
        }else if(respuestas['ies_6'] !== 1){
            if(respuestas['ies_7'] !== undefined){
                delete respuestas['ies_7'];
            }
            if(respuestas['ies_8']!== undefined){
                delete respuestas['ies_8'];
            }
        }

        // IES 20/21 RESP 1
        if(respuestas['ies_20'] === 1 && respuestas['ies_21'] === undefined){
            snackbar('Porfavor contesta la pregunta 2, Seccion 3');
            if(respuestas['ies_20'] !== 1 && respuestas['ies_21'] !== undefined){
                delete respuestas['ies_21'];
            }
        }
        
        // IES 23/24 RESP 1
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