import React, { useState } from 'react';
import NetworkManager from '../../Backend/util/http';
import CuestionarioIES from './IES/IES';
import EmpresasForm from './Empresa/Empresas';

function Cuestionario({ snackbar }) {
    const [key, setKey] = useState('');
    const [done, setDone] = useState(false);
    const [qrol, setQRol] = useState();
    const [qenabled, enableCuestionario] = useState(false)
    const [qdata, setQData] = useState([]);
    let content;

    const handleAuth = async () => {
        let nm = new NetworkManager();
        var response = await nm.post('api/validate', { key: key });
        console.log(response);
        if (response.response === "OK") {
            setQData(response.data.preguntas);
            setQRol(response.data.rol);
            enableCuestionario(true);
        } else {
            snackbar(response.data.exception.message);
        }
    }

    const handleChange = e => {
        setKey((e.target.value).toString());
    }

    // Si no esta activado el cuestionario, preguntamos por codigo de acceso.
    if (qenabled) {
        switch (qrol) {
            case 0:
            case 1:
                content = <div><CuestionarioIES data={qdata} snackbar={snackbar} qkey={key} complete={setDone}/></div>
                break;
            case 2:
                content = <div><EmpresasForm data={qdata} snackbar={snackbar} qkey={key}/></div>
                break;
            default:
                break;
        }
    } else {
        content = <div className="container">
            <div className="d-flex justify-content-center"><h1>Acceso a la Encuesta</h1></div>
            <div className="container d-flex justify-content-center col-3">
                <div className="row d-flex justify-content-center">
                    <input type="text" className="form-control col-3" name="accessKey" onChange={handleChange}></input>
                    <div className="p-2"></div>
                    <button className="btn btn-success btn-lg d-flex justify-content-center col-8" onClick={handleAuth}>Acceder</button>
                </div>
            </div>
        </div>
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default Cuestionario;