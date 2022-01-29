import React, { useEffect, useState } from 'react';
import NetworkManager from '../../../Backend/util/http';
const ResultadoEmpresas = () =>{
    const [ resultado , setResultado ] = useState([]);

    const traerResultado = async () => {
        let nm = new NetworkManager();
        var response = await nm.get("api/estadistica_empresas/resEmpresas");
        console.log(response.data);
        if (response.response === "OK") {
            setResultado(response.data);
        } else {
            //snackbar(response.data.exception.message);
        }
    }
    useEffect(()=>{
        traerResultado();
    },[]);
    return (
        <div className="table.responsive">
            <table className="table table-striped table-bordered">
                <thead className = "table-secondary">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Preguntas</th>
                        <th scope="col">Indicador</th>
                        <th scope="col">Resultado</th>
                        <th scope="col">Unidad de medida</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        resultado.map((element) => {
                            return  <tr>
                                <th scope="row">{element.indicador}</th>
                                <td>{element.pregunta}</td>
                                <td>{element.contenido}</td>
                                <td>{parseFloat(Math.round(element.resultado * 100) / 100).toFixed(2)}</td>
                                <td>{element.unidad_de_medida}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ResultadoEmpresas;