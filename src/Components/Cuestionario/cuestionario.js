import React, { useState } from 'react';
import NetworkManager from '../../Backend/util/http';
import CuestionarioIES from './IES/IES';
import EmpresasForm from './Empresa/Empresas';
import IMGDone from "../../Images/IMG-ENCUESTA-DONE.jpg";
import { useHistory, useLocation } from "react-router-dom";

function Cuestionario({ snackbar }) {
    const history = useHistory();
    const location = useLocation();
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

    const handleAuthKeyPress = (e) => {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            handleAuth();
        }
      }

    const handleChange = e => {
        setKey((e.target.value).toString());
    }

    const handleRedirect = () => {
        history.push(location.state?.from || "/");
    }

    const handleDone = (value) => {
        setDone(value);
        if (value) {
            setQRol(3);
        }
    }

    // Si no esta activado el cuestionario, preguntamos por codigo de acceso.
    if (qenabled) {
        switch (qrol) {
            case 0:
            case 1:
                content = <div><CuestionarioIES data={qdata} snackbar={snackbar} qkey={key} complete={handleDone} /></div>
                break;
            case 2:
                content = <div><EmpresasForm data={qdata} snackbar={snackbar} qkey={key} complete={handleDone}/></div>
                break;
            case 3:
                content = <div className="container">
                    <div className="d-flex justify-content-center"><h1>Gracias por contestar la encuesta!</h1></div>
                    <div className="container d-flex justify-content-center col-3">
                        <div className="row d-flex justify-content-center">
                            <div className="p-2">
                                <center><img src={IMGDone} alt="Imagen de Alerta" style={{ width: "20rem" }}></img></center>
                            </div>
                            <button className="btn btn-success btn-lg d-flex justify-content-center col-8" onClick={handleRedirect}>Terminar</button>
                        </div>
                    </div>
                </div>
                break;
            default:
                break;
        }
    } else {
        content = <div className="container">
            <div className="d-flex justify-content-center"><h1>Acceso a la Encuesta</h1></div>
            <div className="container d-flex justify-content-center col-3">
                <div className="row d-flex justify-content-center">
                    <input type="text" className="form-control col-3" name="accessKey" onChange={handleChange}  onKeyPress={handleAuthKeyPress}></input>
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