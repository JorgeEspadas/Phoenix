import React,{useState} from "react";

function KeyGenerator({snackbar}){

    const [data, setData] = useState([]);

    const handleData = e => {

    }

    const submitData = () =>{
        // enviar solicitud de creacion al back
    }

    return (
        <div className="container">
            <div className="card" style={{width: '32rem'}}>
            <h5 className="card-header text-center">Generar Llave para Encuesta</h5>
                <div className="input-group">
                    <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre"></input>
                </div>
                <div className="input-group">
                    <input type="number" className="form-control d-flex" id="usos" name="usos" placeholder="Numero de Usos"></input>
                </div>
                <div className="input-group">
                    <strong>TBD</strong>
                </div>
                <div className="p2">
                    <button className="btn btn-success">
                        Crear
                    </button>
                </div>
            </div>
        </div>
    );
}

export default KeyGenerator;