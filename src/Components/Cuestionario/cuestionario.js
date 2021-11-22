import React, { useEffect, useState } from 'react';
import NetworkManager from '../../Backend/util/http';
import CuestionarioIES from './IES/IES';
import useAuth from '../auth/useAuth';

function Cuestionario({ snackbar }) {
    var net = new NetworkManager();
    const auth = useAuth();
    /* // useEffect y datos iniciales.
    const getCuestionario = async() =>{
        let response = await net.get('/usuario/cuestionario');
        console.log(response); // por si acaso.
        if(response.response === "OK" && !response.data.answered){
            setFormData(response.data);
            setVisible(true);
        }else{
            snackbar(response.data.exception.message);
            setVisible(false);
        }
    }

    useEffect(() => {
        //getCuestionario();
    },[]); */

    const [key, setKey] = useState('');
    const [qloading, setLoading] = useState(false);
    const [qenabled, enableCuestionario] = useState(false)

    const handleAuth = async () => {
        var response = await net.post('api/validate', { key: key });
        console.log(response);
    }

    const handleChange = e => {
        setKey(e.target.value);
    }

    let content;
    if (auth.isLogged()) {
        // si estamos logueados pedimos el cuestionario al back.
        //await net.post('');
    } else {
        // si no, preguntamos el codigo de acceso.
        if(qenabled){

        }else{
            content = <div className="container">
            <div className="d-flex justify-content-center"><h1>Acceso a la Encuesta</h1></div>
            <div className="container d-flex justify-content-center col-3">
                <div className="row d-flex justify-content-center">
                    <input type="text" className="form-control col-3" name="accessKey" onChange={handleChange}></input>
                    <div className="p-2"></div>
                    <button className="btn-success btn-lg d-flex justify-content-center col-8" onClick={handleAuth}>Acceder</button>
                </div>
            </div>
        </div>
        }
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default Cuestionario;