import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import NetworkManager from "../../../Backend/util/http";
import IESResultExposer from "./modulos/IESResultExposer";

function ResultadosIES({ snackbar }) {

    const [resultData, setResultData] = useState([]);
    const [isResultFormEnabled, setResultFormEnabled] = useState(false);

    const traerResultado = async () => {
        let network = new NetworkManager();
        var response = await network.post('admin/resultados', { 'rol': 1 });
        console.log(response.data);
        if (response.response === 'OK') {
            setResultData(response.data);
            setResultFormEnabled(true);
        } else {
            snackbar(response.data.exception.message);
            setResultFormEnabled(false);
        }
    };

    useEffect(() => {
        traerResultado();
    }, []);



    // results need to be conditionally rendered on screen.
    return (
        <div>
            {
                isResultFormEnabled ? <div>{resultData.metadata.map((seccion, i) => {
                    return (
                        <div style={{ paddingBottom: '20px' }}>
                            <h1> {seccion.categoria} </h1>
                            <div>
                                {
                                    (seccion.indicadores).map((dimension, i) => {
                                        return (
                                            <div>
                                                <Accordion>
                                                    <Accordion.Item eventKey={i}>
                                                        <Accordion.Header>{dimension.titulo}</Accordion.Header>
                                                        <Accordion.Body>
                                                            {(dimension.metadata).map((respuesta, i) => {
                                                                return (
                                                                    <div>
                                                                        <IESResultExposer data={respuesta} number={i + 1} />
                                                                    </div>
                                                                );
                                                            })}
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
                })}</div> : <div></div>
            }
        </div>
    );
}

export default ResultadosIES;