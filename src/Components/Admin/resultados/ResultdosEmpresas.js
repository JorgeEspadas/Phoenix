import React, { useEffect, useState } from 'react';
import NetworkManager from '../../../Backend/util/http';
import DatosTablas from '../../Cuestionario/Empresa/DatosTablas';
import "../../../css/tablaEmpresas.css";
const ResultadoEmpresas = ({snackbar}) =>{
    const [ resultado , setResultado ] = useState([]);
    const [show,setShow] = useState(false);
    const [resultados, setResultados] = useState();
    const [is35,set35] = useState(false);
    const [resOk,setResOk] = useState(false);
    const [isModa, setModa] = useState(false);
    const [textoAux,setTextoAux] = useState("");
    const handleShow = (show,result,indicador,auxText) => {
        setResultados(result);
        setTextoAux(auxText);
        setShow(show);
        if(indicador === "35"){
            set35(true);
        }else{
            set35(false);
        }
        if(indicador==="43" || indicador === "44" || indicador === "45" || indicador==="74" || indicador === "77"){
            setModa(true);
        }else{
            setModa(false);
        }
    }
    const traerResultado = async () => {
        let nm = new NetworkManager();
        var response = await nm.get("api/estadistica_empresas/resEmpresas");
        if (response.response === "OK") {
            setResultado(response.data);
            setResOk(true);
        } else {
            snackbar(response.data.exception.message);
            setResOk(false);
        }
    }
    useEffect(()=>{
        traerResultado();
    },[]);

    return (
        <div>
            {resOk ?
            <div className="empresasTabla p-1">
                <table className="table table-striped table-bordered ">
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
                                    {element.isTabla !== undefined ? 
                                    <div>
                                        <button className="btn btn-secondary" onClick={() => handleShow(true,element.resultado,element.indicador,element.unidad_de_medida)}>Resultados</button>
                                        {show && <DatosTablas handleClose={handleShow} valores = {resultados} is35={is35} isModa={isModa} textoAdicional={textoAux}/>}
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
            : <div></div>
            }
        </div>
    );
}

export default ResultadoEmpresas;