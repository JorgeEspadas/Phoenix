import React, {useState} from "react";
import { Accordion, Alert, Spinner } from "react-bootstrap";
import Multiple from "./tipos/Multiple";
import Rango from "./tipos/Rango";
import Abierta from "./tipos/Abierta";
import Tabla from "./tipos/Tabla";
import NetworkManager from '../../../Backend/util/http';

const EmpresasForm = ({ snackbar, data, qkey }) => {

    const [respuestas, setRespuesta] = useState([]);
    const [buttonDisabled, setButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isVerified , setVerified] = useState(false);
    var numeroDePreguntas = 0;

    const setProperty = (name, value ,tipo) => {    
        let total = numeroDePreguntas;
        //Evitamos duplicados de preguntas.
        for(let i = 0; i < respuestas.length; i++){
            if(respuestas[i].id===name){
                respuestas.splice(i,1);
            }
        }
        
        if(value.length > 0){//Se evalua que el arreglo de respuestas no este vacio.
            let isVacio = true;
            if(tipo==="tabla"){
                /* Si la pregunta es de tipo abierta se verifica que todos sus campos esten contestados
                si todos estan contestados entonces se le permite agregarlo al areglo de respuestas. */
                for(let i = 0; i < value.length; i ++){
                    if(value[i].valor.trim() === ""){
                        isVacio = false;
                    }
                }
            }
            //Se verifica que las preguntas abiertas tengan una respuesta para poder agregarla.
            if(tipo === "abierta"){
                if(value[0].texto.trim() === ""){
                    isVacio = false;
                }
            }

            if(isVacio){//Si el arreglo no esta vacio se agrega la pregunta
                setRespuesta(prevState=>[...prevState, {id:name,valor:value,modulo:tipo}]);//Jorge siempre se rifa
            }
        }
        if(isVerified){
            total = respuestas.length;
        }else{
            total = numeroDePreguntas;
        }
        if (respuestas.length === total-1){
            setButton(false);
            setVerified(true);
        } else{
           // console.log(buttonDisabled);
            setButton(true);
            setVerified(false);
        }
    }

    const handleSubmit = async () => {
        //Ordenamos las respuestas.
        respuestas.sort(((a, b) => parseFloat(a.id.replace("empresas_","")) - parseFloat(b.id.replace("empresas_",""))));
        /* Nos aseguramos que las preguntas con respuestas ligadas a otras preguntas tengan almenos un poco de congruencia en sus respuestas.*/
        for(let i = 0; i < respuestas.length; i++){
            if(respuestas[i].id==="empresas_37" || respuestas[i].id==="empresas_38" || respuestas[i].id==="empresas_39" || respuestas[i].id==="empresas_40" || respuestas[i].id==="empresas_41"){
                if(respuestas[i].valor[0]._id === "2"){
                    respuestas[i+1].valor[0].texto = "0";
                }
            }
            if(respuestas[i].id==="empresas_60" || respuestas[i].id==="empresas_62"){
                if(respuestas[i].valor[0]._id === "3"|| respuestas[i].valor[0]._id === "1"){
                    respuestas[i+1].valor[0].texto = "Ninguno";
                    respuestas[i+1].valor[0]._id = "0";
                }
            }
            if(respuestas[i].id==="empresas_68" || respuestas[i].id==="empresas_70" || respuestas[i].id==="empresas_72"){
                if(respuestas[i].valor[0]._id === "2"){
                    respuestas[i+1].valor[0].texto = "Ninguno";
                    respuestas[i+1].valor[0]._id = "0";
                }
            }
        }
       

        let network = new NetworkManager();
        // ENVIAR CUESTIONARIO AL ENDPOINT PUBLICO
        var response = await network.post('api/preguntas', {'hash': qkey, respuestas: respuestas});
        snackbar("Enviado");
        
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
                                            
                                            case "abierta":
                                                return <Abierta pregunta={pregunta} indice={i} callback={setProperty} numero={numeroDePreguntas}/>
                                                
                                            case "tabla":
                                                return <Tabla pregunta={pregunta} indice={i} callback={setProperty} numero={numeroDePreguntas}/>
                                                 
                                            case "rango":
                                                return <Rango pregunta={pregunta} indice={i} callback={setProperty} numero={numeroDePreguntas}/>
                                            default:
                                                return <div></div>                                                       
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
                    <button
                        className="btn btn-success btn-lg"
                        style={{
                            backgroundColor: "var(--main-bg-primary-color)",
                            color: "white",
                            fontWeight: "bold",
                        }}
                        onClick={handleSubmit}
                        disabled={!loading && buttonDisabled}
                    >
                        {loading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            "Enviar"
                        )}
                    </button>
                </div>
            </div>
            <div className="d-grid gap-2 col-4 mx-auto text-center">
                {buttonDisabled && (<>
                    <Alert variant="warning">
                        Contesta todas las preguntas para continuar.
                    </Alert>
                </>)}
            </div>
        </div>

    )
}

export default EmpresasForm;