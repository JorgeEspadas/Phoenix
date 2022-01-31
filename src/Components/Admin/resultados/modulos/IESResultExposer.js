import React from "react";
import { Accordion } from "react-bootstrap";

function IESResultExposer({ data, number }) {
    var modulo = data.tipo;
    var respuestas = data.resultados;
    return (
        <div>
            {modulo !== 'abierta' ? (<div>
                <Accordion>
                    <Accordion.Item eventKey={data.id}>
                        <Accordion.Header>{data.texto}</Accordion.Header>
                        <Accordion.Body>
                            <div className="card" id="AreaUserCreate">
                                <h5 className="card-header text-center">Respuestas</h5>
                                <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">
                                                    <center>Total</center>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {respuestas.map((r, i) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <p><strong>{r.texto}</strong></p>
                                                        </td>
                                                        <td>
                                                            <center>{r.total}</center>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div style={{paddingTop:'10px'}}>
                                Grafica
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>) : (<div></div>)}
        </div>
    );
}

export default IESResultExposer;