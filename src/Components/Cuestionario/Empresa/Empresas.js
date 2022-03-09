import React, {useState,useEffect} from "react";
import { Accordion, Alert, Spinner } from "react-bootstrap";
import Multiple from "./tipos/Multiple";
import Rango from "./tipos/Rango";
import Abierta from "./tipos/Abierta";
import Util from "../../../Backend/util/Util";
import Tabla from "./tipos/Tabla";
import NetworkManager from '../../../Backend/util/http';
import VerFaltantes from "../PreguntasFaltantes";

const EmpresasForm = ({ snackbar, data, qkey,complete }) => {

    const [respuestas, setRespuesta] = useState([]);
    const [loading, setLoading] = useState(false);
    const [numPreguntas,setNumPreguntas] = useState(0);
    const [ datosPreguntas , setDatosPreguntas ] = useState([]);
    const [faltantes, setFaltantes] = useState([]);
    const [show,setShow] = useState(false);
    const [index, setIndex] = useState([]);
    const [ ids , setIds ] = useState([]);

    const handleRevisar = () => {
        let auxFaltantes = [];
        let auxIndex = [];
        setFaltantes(auxFaltantes);
        setIndex(auxIndex);
        datosPreguntas.map((datos,i) => {
            if(!ids.includes(datos._id)){
                //console.log(document.getElementById(datos._id));
                setFaltantes(prevState => [...prevState,datos.texto ]);
                setIndex(prevState => [...prevState,datos.numero ]);
            }
        });
    }

    const handleShow = (isShow) => {
        console.log("ddds")
        if(isShow){
            handleRevisar();
        }
        setShow(isShow);
    }

    useEffect ( () => {
        let numeroDePreguntas = 0;
        let auxDatosPreguntas = [];
            data.map((categoria,i) => {
                categoria.preguntas.map((pregunta,i) =>{
                    numeroDePreguntas=numeroDePreguntas+1;  
                    auxDatosPreguntas.push({
                        texto:pregunta.texto,
                        numero:parseFloat((pregunta._id).replace("empresas_","")),
                        _id:pregunta._id
                    });
            });
         });
         setDatosPreguntas(auxDatosPreguntas);
        setNumPreguntas(numeroDePreguntas);
    },[]);

    const setProperty = (name, value ,tipo) => {  
        //Evitamos duplicados de preguntas.
        for(let i = 0; i < respuestas.length; i++){
            if(respuestas[i].id===name){
                respuestas.splice(i,1);
                ids.splice(i,1);
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
                setRespuesta(prevState=>[...prevState, {id:name,valor:value,modulo:tipo}]);
                setIds(prevState => [...prevState,name ]);  
            }

        }
        
    }

    const handleSubmit = async () => {
        if(respuestas.length === numPreguntas){
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
            setLoading(true);
            await Util.delay(1000);
            var response = await network.post('api/preguntas', {'hash': qkey, respuestas: respuestas});
            setLoading(false);
            if (response['response'] === "OK") {
                // quitamos el cuestionario, y/o redirijimos a home
                complete(true);
            }else{
                snackbar(response.data.exception.message);
            }
        }else{
            snackbar("Contesta todas las preguntas.");
        }
        
    }

    return (
        <div>
            
                {data.map((categoria,i) => {
                        return <Accordion defaultActiveKey="0" key={categoria.categoria} style={{ paddingBottom: '20px' }}>
                            <Accordion.Item eventKey={i} >
                            <Accordion.Header>{categoria.categoria}</Accordion.Header>
                            <Accordion.Body>
                                {
                                    categoria.preguntas.map((pregunta,i) =>{
                                        switch(pregunta.tipo){
                                            case "multiple":
                                                return <Multiple key={i} pregunta={pregunta} indice={i} callback={setProperty} numero={pregunta._id.replace("empresas_","")} snackbar={snackbar}/>
                                            
                                            case "abierta":
                                                return <Abierta key={i} pregunta={pregunta} indice={i} callback={setProperty} numero={pregunta._id.replace("empresas_","")} snackbar={snackbar}/>
                                                
                                            case "tabla":
                                                return <Tabla key={i} pregunta={pregunta} indice={i} callback={setProperty} numero={pregunta._id.replace("empresas_","")} snackbar={snackbar}/>
                                                 
                                            case "rango":
                                                return <Rango key={i} pregunta={pregunta} indice={i} callback={setProperty} numero={pregunta._id.replace("empresas_","")}/>
                                            default:
                                                return <div></div>                                                       
                                        }
                                    })
                                }
                            </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                    })
                }
                
            <div className="container d-flex justify-content-center pt-5">
                <div className="d-grid gap-2 col-4 mx-auto">
                    <button
                        className="btn btn-lg btn btn-outline-warning"
                        style={{
                            fontWeight: "bold",
                        }}   
                        onClick={()=>handleShow(true)}
                    >
                    Revisar Encuesta.
                    </button>
                    {show ? <VerFaltantes faltantes={faltantes} handleClose={handleShow} num={index}></VerFaltantes> : <></>}
                </div>
            </div>
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
        </div>

    )
}

export default EmpresasForm;