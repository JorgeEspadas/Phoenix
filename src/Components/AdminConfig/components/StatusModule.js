import React, { useEffect, useState } from "react";
import NetworkManager from "../../../Backend/util/http";


function StatusModule({ snackbar }) {
    var net = new NetworkManager();
    const [content, setContent] = useState(<></>);

    const setContentState = content => {
        setContent(content);
    }

    const getBackendStatus = async () => {
        let response = await net.get('admin/status');
        if (response.response !== "OK") {
            //show error.
            snackbar(response.data.exception.message);
        } else {
            setContentState(<div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item ">Tiempo en linea: <strong className="text-success">{response.data.uptime}</strong> <strong>Horas.</strong></li>
                    <li className="list-group-item">Estado de la DB: {(response.data.mongo !== "Conectado") ? <strong className="text-danger">{response.data.mongo}</strong> : <strong className="text-success">{response.data.mongo}</strong>}</li>
                </ul>
            </div>);
        }
    }

    useEffect(() => {
        getBackendStatus();
    }, []);

    return (
        <div className="container">
            <div className="card" style={{ width: '24rem' }}>
                <h5 className="card-header text-center">Status</h5>
                {content}
            </div>
        </div>
    );
}

export default StatusModule;