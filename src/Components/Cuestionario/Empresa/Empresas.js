import React, {useState} from "react";
import { Accordion } from "react-bootstrap";
import { preguntas_empresas } from "./DatosEmpresas";
import Multiple from "./tipos/Multiple";
import Rango from "./tipos/Rango";
import Abierta from "./tipos/Abierta";
import Tabla from "./tipos/Tabla";
import NetworkManager from '../../../Backend/util/http';

const EmpresasForm = ({ snackbar, data, qkey }) => {

    const [respuestas, setRespuesta] = useState([]);
    var numeroDePreguntas = 0;

    const setProperty = (name, value) => {
        setRespuesta(prevState=>[...prevState, {id:name,valor:value}]);//Jorge siempre se rifa
    }

   const enviarRespuestas = () => {
       if((Object.values(respuestas).length) < numeroDePreguntas){
           snackbar("Contesta todas las preguntas");
           console.log(respuestas)
           
       }else{
           if(respuestas.empresas_37.valor[0]._id === "2"){
               respuestas.empresas_37_1.valor[0].texto = "0";
           }
           if(respuestas.empresas_38.valor[0]._id === "2"){
               respuestas.empresas_38_1.valor[0].texto = "0";
           }
           if(respuestas.empresas_39.valor[0]._id === "2"){
               respuestas.empresas_39_1.valor[0].texto = "0";
           }
           if(respuestas.empresas_40.valor[0]._id === "2"){
                respuestas.empresas_40_1.valor[0].texto = "0";
            }
           if(respuestas.empresas_40_1.valor[0]._id === "2"){
               respuestas.empresas_41_1.valor[0].texto = "0";
           }
           if(respuestas.empresas_60.valor[0]._id === "3"){
               respuestas.empresas_61.valor[0].texto = "Ninguno";
           }
           if(respuestas.empresas_62.valor[0]._id === "3"){
               respuestas.empresas_63.valor[0].texto = "Ninguno"; 
           }
           if(respuestas.empresas_68.valor[0]._id === "2"){
               respuestas.empresas_69.valor[0].texto = "Ninguno"; 
           }
           if(respuestas.empresas_70.valor[0]._id === "2"){
               respuestas.empresas_71.valor[0].texto = "Ninguno"; 
           }
           if(respuestas.empresas_72.valor[0]._id === "2"){
                respuestas.empresas_73.valor[0].texto = "Ninguno"; 
           }
       }
   }

    const handleSubmit = async () => {
        console.log("Enviado");
        let network = new NetworkManager();
        // ENVIAR CUESTIONARIO AL ENDPOINT PUBLICO
        var response = await network.post('api/preguntas', {'hash': qkey, respuestas: respuestas});
    }

    return (
        <div>
            <Accordion defaultActiveKey="0">
                {data.map((categoria,i) => {
                        return <Accordion.Item eventKey={i} name={i} key={categoria.categoria}>
                            <Accordion.Header>{categoria.categoria}</Accordion.Header>
                            <Accordion.Body>
                                {
                                    categoria.preguntas.map((pregunta,i) =>{
                                        numeroDePreguntas = numeroDePreguntas + 1;
                                        switch(pregunta.tipo){
                                            case "multiple":
                                                return <Multiple pregunta={pregunta} indice={i} callback={setProperty} numero={numeroDePreguntas}/>
                                                break;
                                            case "abierta":
                                                return <Abierta pregunta={pregunta} indice={i} callback={setProperty} numero={numeroDePreguntas}/>
                                                break;
                                            case "tabla":
                                                return <Tabla pregunta={pregunta} indice={i} callback={setProperty} numero={numeroDePreguntas}/>
                                                break; 
                                            case "rango":
                                                return <Rango pregunta={pregunta} indice={i} callback={setProperty} numero={numeroDePreguntas}/>
                                            break;                                                       
                                        }
                                    })
                                }
                            </Accordion.Body>
                    </Accordion.Item>
                    })
                }
                
            </Accordion>
            <div className="container d-flex justify-content-center p-5">
                <div className="d-grid gap-2 col-4 mx-auto">
                    <button className="btn btn-success btn-lg" onClick={handleSubmit}>Enviar</button>
                </div>
            </div>
        </div>

    )
}

export default EmpresasForm;