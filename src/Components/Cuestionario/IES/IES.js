import React, { useState } from "react";
import { Accordion, Alert, Spinner } from "react-bootstrap";
import NetworkManager from '../../../Backend/util/http';
import PreguntaAbierta from "./Modulos/Pregunta_Abierta";
import PreguntaMultiple from "./Modulos/Pregunta_Multiple";

function CuestionarioIES({ snackbar, data, qkey }) {
    const [respuestas, setRespuesta] = useState([]);
    const [buttonDisabled, setButton] = useState(false);
    const [loading, setLoading] = useState(false);

    var total = 0;
    var preguntas = data;

    const setProperty = (name, value, texto, extradata) => {
        var xtradata = (extradata === undefined) ? '' : extradata;

        for (var i = 0; i < respuestas.length; i++) {
            if (respuestas[i].id === name) {
                respuestas.splice(i, 1);
            }
        }

        //console.log('name: '+name+', val: '+value+', text: '+texto+' extra: '+extradata);

        setRespuesta(prevState => [...prevState, { id: name, valor: value, texto: texto, extra: xtradata }]);
        if ((Object.values(respuestas).length) === total - 1) setButton(false);
    }

    const handleSubmit = async (event) => {
        console.log(JSON.stringify({ respuestas: [respuestas] }));
        if (qkey === undefined) {
            console.log('Event Registered without Key, Sending...');
            let network = new NetworkManager();
            // ENVIAR CUESTIONARIO AL ENDPOINT DE USUARIO REGISTRADO.
            var response = await network.post('usuario/preguntas/guardar', { "respuestas": respuestas });
            if (response['response'] === "OK") {
                // quitamos el cuestionario, y/o redirijimos a home
            }
        } else {
            handleTemporalFormSubmit();
        }
    }

    const handleTemporalFormSubmit = async () => {
        console.log('Event Registered WITH Key, Sending...');
        let network = new NetworkManager();
        var response = await network.post('api/preguntas', { 'hash': qkey, respuestas: respuestas });
        if (response['response'] === "OK") {
            // quitamos el cuestionario, y/o redirijimos a home
        }
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
                                                <Accordion style={{ paddingBottom: '20px' }}>
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
                    <button
                        className="btn btn-success btn-lg"
                        style={{
                            backgroundColor: "var(--main-bg-primary-color)",
                            color: "white",
                            fontWeight: "bold",
                        }}
                        onClick={handleSubmit}
                        disabled={!loading && buttonDisabled}
                    >
                        {loading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            "Enviar"
                        )}
                    </button>
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