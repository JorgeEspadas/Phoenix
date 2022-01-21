import React, { useEffect, useState } from 'react';
import NetworkManager from '../../Backend/util/http';
import CuestionarioIES from './IES/IES';
import EmpresasForm from './Empresa/Empresas';
import useAuth from '../auth/useAuth';

function Cuestionario({ snackbar }) {
    var net = new NetworkManager();
    const auth = useAuth();
    const [key, setKey] = useState('');
    const [qloading, setLoading] = useState(false);
    const [qenabled, enableCuestionario] = useState(true)
    const [qdata, setQData] = useState([]);
    let content;
    var preguntas = "";

    // useEffect para ejecutar solo una vez.
    const getCuestionario = async () => {
        if (auth.isLogged()) {
            let response = await net.post('usuario/preguntas');
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
        var response = await net.post('api/validate', { key: key });
        if (response.response === "OK") {
            // La respuesta del codigo temporal es valida, asi que activaremos el cuestionario con la data que nos llego.
            // response.data.preguntas
            setQData(response.data.preguntas);
            enableCuestionario(true);

            // TODO: Guardar la llave que se uso y pasarla para que pueda enviarse el cuestionario con esa llave.
            //
        }
    }

    const handleChange = e => {
        setKey(e.target.value);
    }

    // Si no esta activado el cuestionario, preguntamos por codigo de acceso.
    if (qenabled) {
        content = <div><EmpresasForm snackbar={snackbar} /></div>
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