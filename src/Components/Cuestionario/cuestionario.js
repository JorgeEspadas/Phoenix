import React, { useEffect, useState } from 'react';
import NetworkManager from '../../Backend/util/http';
import CuestionarioIES from './IES/IES';
import useAuth from '../auth/useAuth';

function Cuestionario({ snackbar }) {
    const auth = useAuth();
    const [key, setKey] = useState('');
    const [qloading, setLoading] = useState(false);
    const [qenabled, enableCuestionario] = useState(false)
    const [qdata, setQData] = useState([]);
    let content;
    var preguntas = "";

    // useEffect para ejecutar solo una vez.
    const getCuestionario = async () => {
        let nm = new NetworkManager();
        if (auth.isLogged()) {
            let response = await nm.post('usuario/preguntas');
            console.log(response); // por si acaso, todo:  && !response.data.answered
            if (response.response === "OK") {
                setQData(response.data.preguntas);
                enableCuestionario(true);
            } else {
                snackbar(response.data.exception.message);
                enableCuestionario(false);
            }
        }
    }

    useEffect(() => {
        getCuestionario();
    }, []);


    const handleKeyAuth = async () => {
        let nm = new NetworkManager();
        var response = await nm.post('api/validate', { key: key });
        console.log(response);
        if (response.response === "OK") {
            // La respuesta del codigo temporal es valida, asi que activaremos el cuestionario con la data que nos llego.
            // response.data.preguntas
            setQData(response.data.preguntas);
            enableCuestionario(true);

        }else{
            snackbar(response.data.exception.message);
        }
    }

    const handleChange = e => {
        setKey(e.target.value);
        console.log(key);
    }

    // Si no esta activado el cuestionario, preguntamos por codigo de acceso.
    if (qenabled) {
        content = <div><CuestionarioIES data={qdata} snackbar={snackbar} key={key} /></div>
    } else {
        content = <div className="container">
            <div className="d-flex justify-content-center"><h1>Acceso a la Encuesta</h1></div>
            <div className="container d-flex justify-content-center col-3">
                <div className="row d-flex justify-content-center">
                    <input type="text" className="form-control col-3" name="accessKey" onChange={handleChange}></input>
                    <div className="p-2"></div>
                    <button className="btn btn-success btn-lg d-flex justify-content-center col-8" onClick={handleKeyAuth}>Acceder</button>
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