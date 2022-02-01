import React, { useEffect, useState } from 'react';
import NetworkManager from '../../../Backend/util/http';
import DatosTablas from '../../Cuestionario/Empresa/DatosTablas';
const ResultadoEmpresas = () =>{
    const [ resultado , setResultado ] = useState([]);
    const [show,setShow] = useState(false);
    const [resultados, setResultados] = useState();
    const [is35,set35] = useState(false);
    const handleShow = (show,result,indicador) => {
        setResultados(result)
        setShow(show);
        if(indicador === "35"){
            set35(true);
        }else{
            set35(false);
        }
    }
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
        <div className=''>
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
                            console.log(element.isTabla !== undefined)
                            return  <tr>
                                <th scope="row">{element.indicador}</th>
                                <td>{element.pregunta}</td>
                                <td>{element.contenido}</td>
                                {element.isTabla !== undefined ? 
                                   <div>
                                       <button className="btn btn-secondary" onClick={() => handleShow(true,element.resultado,element.indicador)}>Resultados</button>
                                       {show && <DatosTablas handleClose={handleShow} valores = {resultados} is35={is35}/>}
                                   </div>
                                : 
                                    element.promedio !== undefined ?
                                        <td>{parseFloat(Math.round(element.resultado * 100) / 100).toFixed(2)}</td> 
                                    :
                                        element.resultado === "" ?
                                            <td>{""}</td>
                                        :
                                            <td>{parseFloat(Math.round(element.resultado * 100) / 100).toFixed(2)}%</td> 
                                }                             
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