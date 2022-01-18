import React, {useEffect, useState} from 'react';
import NetworkManager from '../../Backend/util/http';
import CuestionarioIES from './IES/IES';
import EmpresasForm from './Empresa/Empresas';

function Cuestionario({snackbar}) {
    var net = new NetworkManager();
    // useEffect y datos iniciales.
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
    },[]);

    // Obtener todas las preguntas, el token se encarga de todo.
    const [formData, setFormData] = useState({});
    const [visible, setVisible] = useState(false);

    // en el true, va el componente que pintara cada modulo?
    // CAMBIA AQUI PARA MOSTRAR TU CUESTIONARIO
    return (
        <div>
            <EmpresasForm snackbar={snackbar}/>
        </div>
    );
}

export default Cuestionario;