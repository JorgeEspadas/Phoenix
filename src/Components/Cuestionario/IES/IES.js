import React, { useState, useEffect } from "react";
import { Accordion, Alert, Spinner } from "react-bootstrap";
import NetworkManager from '../../../Backend/util/http';
import Util from "../../../Backend/util/Util";
import PreguntaAbierta from "./Modulos/Pregunta_Abierta";
import PreguntaMultiple from "./Modulos/Pregunta_Multiple";
import VerFaltantes from "../PreguntasFaltantes";

function CuestionarioIES({ snackbar, data, qkey, complete}) {
    const [respuestas, setRespuesta] = useState([]);
    const [buttonDisabled, setButton] = useState(true);
    const [loading, setLoading] = useState(false);
    const [ datosPreguntas , setDatosPreguntas ] = useState([]);
    const [ ids , setIds ] = useState([]);
    const [faltantes, setFaltantes] = useState([]);
    const [show,setShow] = useState(false);
    const [index, setIndex] = useState([]);
    const [primeraRes, setPrimeraRes] = useState("");
    var total = 0;
    var preguntas = data;
    let num = 0;
    const setProperty = (name, value, texto, extradata) => {
        var xtradata = (extradata === undefined) ? '' : extradata;

        for (var i = 0; i < respuestas.length; i++) {
            if (respuestas[i].id === name) {
                respuestas.splice(i, 1);
                ids.splice(i,1);
            }
        }

        //console.log('name: '+name+', val: '+value+', text: '+texto+' extra: '+extradata);
        setRespuesta(prevState => [...prevState, { id: name, valor: value, texto: texto, extra: xtradata }]);
        setIds(prevState => [...prevState,name ]);  
        if ((Object.values(respuestas).length) === total - 1) setButton(false);
    }

    const handleSubmit = async (event) => {
        //setLoading(true);
        if (qkey === undefined) {
            console.log('Event Registered without Key, Sending...');
            let network = new NetworkManager();
            // ENVIAR CUESTIONARIO AL ENDPOINT DE USUARIO REGISTRADO.
            var response = await network.post('usuario/preguntas/guardar', { "respuestas": respuestas });
            if (response['response'] === "OK") {
                // quitamos el cuestionario, y/o redirijimos a home
                complete(true);
            }
        } else {
            handleTemporalFormSubmit();
        }
    }

    const handleTemporalFormSubmit = async () => {
        setLoading(true);
        await Util.delay(1000);
        let network = new NetworkManager();
        var response = await network.post('api/preguntas', { 'hash': qkey, respuestas: respuestas });
        setLoading(false);
        if (response['response'] === "OK") {
            // quitamos el cuestionario, y/o redirijimos a home
            complete(true);
        }else{
            snackbar(response.data.exception.message);
        }
    }

    useEffect(()=>{
        let numPregunta = 0;
        data.map((seccion,i)=>{
            seccion.indicadores.map((dimension,i) =>{
                dimension.preguntas.map((pregunta,i)=>{
                    numPregunta = numPregunta + 1;
                    let datos = {
                        texto:pregunta.texto,
                        _id:pregunta.id,
                        numPregunta: numPregunta
                    }
                    setDatosPreguntas(prevState => [...prevState,datos]);
                });
            });
        });
    },[]);

    const handleRevisar = () => {
        let auxFaltantes = [];
        let auxIndex = [];
        setFaltantes(auxFaltantes);
        setIndex(auxIndex);
        datosPreguntas.map((datos,i) => {
            if(!ids.includes(datos._id)){
                //console.log(document.getElementById(datos._id));
                setFaltantes(prevState => [...prevState,datos.texto ]);
                setIndex(prevState => [...prevState,datos.numPregunta ]);
            }
        });
    }

    const handleShow = (isShow) => {
        if(isShow){
            handleRevisar();
        }
        setShow(isShow);
    }
    return (
        <div>
            {
                preguntas.map((seccion, i) => {
                    return (
                        <div key={seccion.header}>
                            <h1> {seccion.header} </h1>
                            <div>
                                {
                                    seccion.indicadores.map((dimension, i) => {
                                        total = total + dimension.preguntas.length;
                                        return (
                                            <div key={dimension.titulo}>
                                                <Accordion style={{ paddingBottom: '20px' }}>
                                                    <Accordion.Item eventKey={i}>
                                                        <Accordion.Header>{dimension.titulo}</Accordion.Header>
                                                        <Accordion.Body>
                                                            {
                                                                dimension.preguntas.map((pregunta, i) => {
                                                                    num = num +1;
                                                                    switch (pregunta.modulo) {
                                                                        case "multiple":
                                                                            return <PreguntaMultiple id={pregunta.id} texto={pregunta.texto} respuestas={pregunta.respuestas} callback={setProperty} num={num} key={pregunta.id}/>;
                                                                        case "abierta":
                                                                            return <PreguntaAbierta modulo={pregunta} callback={setProperty} num={num} key={pregunta.id}/>;
                                                                        default:
                                                                            return <div></div>;
                                                                    }
                                                                })
                                                            }
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    );
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
                    {show ? <VerFaltantes faltantes={faltantes} handleClose={handleShow} num={index} primeraRespuesta ={primeraRes}></VerFaltantes> : <></>}
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
        </div >
    );
}
export default CuestionarioIES;