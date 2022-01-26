import React, { useState, useEffect } from "react";
import { Spinner, Form, Alert } from "react-bootstrap";
import NetworkManager from "../../../Backend/util/http";
import Util from "../../../Backend/util/Util";

function KeyGenerator({ snackbar }) {
    const roles = [
        {
            label: "IES",
            value: 1,
        },
        {
            label: "Empresa",
            value: 2,
        },
        {
            label: "Alumno",
            value: 0,
        },
    ];

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [loadingDone, setLoadingDone] = useState(false);
    const [llave, setLlave] = useState("");
    const [llaves, setLlaves] = useState([]);

    const receiveList = async () => {
        let nm = new NetworkManager();
        var result = await nm.get('admin/temporal/list');
        if (result.response === "OK") {
            setLlaves(result.data.llaves);
        }
    }

    useEffect(() => {
        receiveList();
    }, [llave])

    const handleData = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleDelete = async (hash) => {
        let nm = new NetworkManager();
        var result = await nm.post('admin/temporal/delete', {hash: hash});
        if(result.response === "OK"){
            receiveList();
            snackbar('Llave borrada con exito');
        }
    }

    const submitData = async () => {
        let nm = new NetworkManager();
        console.log(data.rol);
        var payload = {
            nombre: data.nombre,
            usos: data.usos,
            rol: (data.rol === undefined) ? "1" : data.rol
        };

        console.log(payload);

        setLoading(true);
        await Util.delay(1000);
        var result = await nm.post('admin/temporal/generate', payload);

        if (result.response === "OK") {
            setLoading(false);
            setLlave(result.data.key);
            setLoadingDone(true);
            snackbar('Llave generada');
        } else {
            setLoading(false);
            setLoadingDone(false);
            snackbar(result.data.exception.message);
        }
    }

    return (
        <div className="container">
            <div className="card" style={{ width: '32rem' }}>
                <h5 className="card-header text-center">Generar Llave para Encuesta</h5>
                <div className="input-group" style={{ paddingLeft: "16px", paddingRight: "16px", paddingBottom: "5px", paddingTop: "10px" }}>
                    <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre" onChange={handleData}></input>
                </div>
                <div className="input-group" style={{ paddingLeft: "16px", paddingRight: "16px", paddingBottom: "5px", paddingTop: "5px" }}>
                    <input type="number" className="form-control d-flex" id="usos" name="usos" placeholder="Numero de Usos" onChange={handleData}></input>
                </div>
                <div className="input-group" style={{ paddingLeft: "16px", paddingRight: "16px", paddingBottom: "5px", paddingTop: "5px" }}>
                    <Form.Select
                        onChange={handleData} id="rol" name="rol"
                    >
                        {roles.map((rol) => (
                            <option
                                key={rol.value}
                                value={rol.value}
                                style={{ color: "var(--main-bg-primary-color)" }}
                            >
                                {rol.label}
                            </option>
                        ))}
                    </Form.Select>
                </div>

                <div
                    id="btnRegistrar"
                    className="row"
                    style={{ marginLeft: "0.1rem", marginRight: "0.1rem", paddingBottom: "20px", paddingTop: "20px", paddingLeft: "16px", paddingRight: "16px" }}
                >
                    <button
                        className="btn btn-default"
                        style={{
                            backgroundColor: "var(--main-bg-primary-color)",
                            color: "white",
                            fontWeight: "bold",
                        }}
                        onClick={submitData}
                        disabled={loading}
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
                            "Registrar"
                        )}
                    </button>
                </div>

                <div className="d-grid gap-2 col-10 mx-auto text-center">
                    {loadingDone && (<>
                        <Alert variant="warning">
                            Llave generada: {llave}
                        </Alert>
                    </>)}
                </div>

            </div>
            <div style={{ paddingTop: '20px' }}>
                <div className="card" style={{ width: '32rem' }}>
                    <h5 className="card-header text-center">Llaves en el sistema</h5>
                    <div style={{paddingLeft: '10px', paddingRight:'10px'}}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Usos</th>
                                    <th scope="col" colSpan={2}><center>Acciones</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    llaves.map((llave, index) => (
                                        <tr>
                                            <th scope="row">{index+1}</th>
                                            <td>{llave.nombre}</td>
                                            <td>{llave.usos}</td>
                                            <td><center><button type="button" class="btn btn-primary" onClick={() => {
                                                navigator.clipboard.writeText(llave.hash);
                                                snackbar('Llave copiada al portapapeles');
                                            }}>Copiar Llave</button></center></td>
                                            <td><center><button type="button" className="btn btn-danger" onClick={() => handleDelete(llave.hash)}>Borrar</button></center></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KeyGenerator;