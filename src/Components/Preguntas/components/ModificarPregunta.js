import React, { useEffect, useState, Fragment } from "react";
import NetworkManager from "../../../Backend/util/http";
const ModificarPregunta = ({snackbar}) => {
    var net = new NetworkManager();
    const [ data , setData ] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ dataFound , setDataFound ] = useState([]);
    const [ numQuestion , setNumQuestion ] = useState(0);
    const [ isModify, setModify ] = useState(false);
    const [ question , setQuestion ] = useState({
        texto: "",
        tipo:"",
        modulo:"",
        categoria:"",
        multiples:false,
        respuestas:[{
            id_respuesta:"",
            texto:"", 
            abierta: false
        }]
    });
    const [ isModificar, setModificar ] = useState(false);
    const [ categorias , setCategorias ] = useState([]);
    const [ indiceRes , setIndiceRes ] = useState(0);
    const [ res, setRes ] = useState([]);
    const [ indiceCategoria , setIndiceCategoria ] = useState(0);
    const [ isAbierta , setIsAbierta ] = useState([]);
    const [ id , setId ] = useState("");

    const modulos = [
        {
            label: "abierta",
            value: 0
        },
        {
            label: "multiple",
            value: 1
        },
        {
            label: "rango",
            value: 2
        }
    ];

    const resetPregunta = () =>{
        setQuestion({
            texto: "",
            tipo:"",
            modulo:"",
            categoria:"",
            multiples:false,
            respuestas:[{
                id_respuesta:"",
                texto:"",
                abierta: false
            }]
        });
        vaciarRes();
    }

    const Opciones = (props) => {
        let valor = props.indice;
        return(<Fragment>   
            <div className="mb-3 row">
                <div className="row">
                    <label className="col-sm-3 col-form-label">Opción:</label>
                    <div className="col-sm-9 mb-3">
                        <input  className="form-control" type="text" name={"respuesta_"+valor} id={"opcion"+valor} defaultValue={props.value}/>
                    </div>
                </div>         
                <div className="mb-2 row">
                    <label className="col-sm-6 col-form-label" for="abierta">Abierta
                        <input type="checkbox" id={"abierta_"+valor}  className="mx-2" name={valor} onClick={handleChecked} 
                        defaultChecked={isAbierta[valor]}/>
                    </label>
                    <div className="col-sm-6">
                        <button type='button' onClick={handleEliminar} name={valor} className="btn btn-danger">Eliminar</button> 
                    </div>
                </div>
            </div>
        </Fragment>)
    } 

    const handleChecked = e => {
        const target = e.target;
        const name = target.name;
        if(isAbierta[parseInt(name,10)]){
            isAbierta[parseInt(name,10)] = false;
        }else{
            isAbierta[parseInt(name,10)] = true;
        }
        setModificar(true);
    }

    const vaciarRes = () => {
        if(res.length !== 0){
            setRes([]);
            setIndiceRes(0);
            setIsAbierta([]);
        } 
    }

    const obtenerPreguntas = async () => {
        let response = await net.get('/admin/preguntas'); 
        console.log(response);
        if(response.response === "OK"){
            setData(response.data);
        }else{
            snackbar(response.data.exception.message);
        }
        
    }

    useEffect (() => {
        obtenerPreguntas()
    },[])

    const secciones = () => {
        let secciones = []
        categorias.map( (item) => {
            secciones.push(item.id_categoria);
        })
        return secciones;
    }

    const handleSearchbar = (e) =>{
        setSearch(e.target.value);
    }

    const obtenerValores = () => {
        let opciones = [];
        let cont = 0;
        let respuesta = {
            id_respuesta:"",
            texto:"",
            abierta: false
        }
        if(question.modulo === "multiple"){
            res.map( (item, i) => {
                if(item !== null){
                    respuesta.id_respuesta = cont+"";
                    respuesta.texto = document.getElementById("opcion"+i).value;
                    respuesta.abierta = isAbierta[i];
                    opciones.push(respuesta);
                    respuesta = {};
                    cont++;
                }
            })
        }else if(question.modulo === "rango"){
            let rangos = document.getElementById("opcionesRango").querySelectorAll("input");
            rangos.forEach( (item) => {
                respuesta.id_respuesta = cont+"";
                respuesta.texto = item.value;
                opciones.push(respuesta);
                respuesta = {};
                cont++;
            })
        }else if(question.modulo === "abierta"){
            respuesta.id_respuesta = cont+"";
            respuesta.abierta = true;
            respuesta.texto=" ";
            opciones.push(respuesta);
        }
       
        return opciones;
    }

    const handleModificar = async (e) => { 
        let response = await net.get('/admin/categorias'); 
        console.log(response)
        if(response.response === "OK"){
            setNumQuestion(parseInt(e.target.value,10));
            let pregunta = dataFound[parseInt(e.target.value,10)];
            setQuestion(pregunta);
            setId(pregunta.id_pregunta);
            console.log(pregunta.id_pregunta)
            respuesta_abierta(pregunta.respuestas);
            imprimeRespuestas(pregunta.respuestas);
            setCategorias(response.data);
            setModify(true);   
        }else{
            snackbar(response.data.exception.message);
        }
        document.getElementById("texto-pregunta").focus();
    }
    
    const respuesta_abierta = (respuestas) => {
        if(search === "multiple"){
            respuestas.map( (item) => {
                isAbierta.push(item.abierta);
            })
        }
    }

    const imprimeRespuestas = (respuestas) => {
        if(search === "multiple"){
            let cont = 0;
            respuestas.map( (item,i) => {
                res.push(<Opciones indice={i} value={item.texto}  key={i.toString()}/>);
                cont+=1;
            })
            setIndiceRes(cont);
        }
    }

    const handleClick = () => {
        setModify(false);
        vaciarRes();
        let busqueda = []
        data.map( (item) => {
            if(item.modulo === search){
                busqueda.push(item);
            }
        })
        setDataFound(busqueda);
    }

  
    const handleEliminar = e => {
        let deleteIndice = parseInt(e.target.name,10);
        delete  res[deleteIndice];
        delete isAbierta[deleteIndice];
        setModificar(true);
    }

    const handleChangeQuestion = (e) =>{
        let valor;
        if (e.target.value === "true"){
            valor = true;
        }else if(e.target.value === "false"){
            valor = false;
        }else if(e.target.name === "tipo"){
            valor = categorias[parseInt(e.target.value,10)].id_categoria;
            setIndiceCategoria(parseInt(e.target.value));
            question.categoria = "";
        }else if(e.target.name === "modulo"){
            question.respuestas = [];
            if(e.target.value !== "multiple"){
                vaciarRes();
            }
            valor = e.target.value;
        }else{
            valor = e.target.value;
        }
        setQuestion({
            ...question,
            [ e.target.name ] : valor
        })
    }

    const handleAddRes = e => {
        isAbierta.push(false);
        res.push(<Opciones indice = {indiceRes} value={""}  key={indiceRes.toString()}/>);
        setRes(res);
        setIsAbierta(isAbierta);
        setIndiceRes(indiceRes+1);
        setModificar(true);
    }

    const handleSave = async (e) => {
        let opciones = obtenerValores();
        if(question.texto.trim().length === 0 || question.tipo.length === 0 || question.modulo.length === 0 || question.categoria.length === 0){
             snackbar("Rellena todas los campos");
            return;
        }

        if(question.modulo === "multiple" || question.modulo === "rango"){
            let isVacio = false;
            if(opciones.length !== 0){
                opciones.map((item,i) => {
                    if(item.texto.trim().length === 0){
                        isVacio = true;
                    }
                });
            }else{
                snackbar("No se han agregado las opciones de respuesta");
                return;
            }

            if(isVacio){
                snackbar("Rellena todas las opciones");
                return;
            }
            
        }
        question.respuestas = opciones;
        let payload = {
            texto: question.texto,
            tipo: question.tipo,
            modulo:question.modulo,
            categoria:question.categoria,
            multiples:question.multiples,
            respuestas: question.respuestas
        }
        let response = await net.put('/admin/preguntas/'+id,payload);
        console.log(response)
        if(response.response === "OK"){
            snackbar(response.data.message);
            for(let i in data){
                if(data[i].id_pregunta === id){
                    data[i] = question;
                    dataFound[numQuestion] = question;
                    return
                }
            }
        }else{
            snackbar(response.data.exception);
        }
    }

    const handleSalir = e =>{
        resetPregunta();
        setModify(false);
    }
    return (
        <div className="my-3 row">
            <div className="my-3 row" id="buscar">
                <div className="col-sm-10">
                    <select className="form-select " name="selectModulos" onChange={handleSearchbar} id="select-buscar">
                        <option value={modulos[0].label} selected>slecciona una opción:</option>
                        {
                            modulos.map((item) => {
                                return <option value={item.label}>{item.label}</option>
                            })
                        }
                    </select>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-primary" onClick={handleClick} id="btn-buscar">Buscar</button>
                </div>
            </div>
            {!isModify ?
                dataFound.map((item,i) => {
                    return(
                        <div key={item._id} className="m-3">
                            <div className="mb-2 row">
                                <label className="col-sm-9 col-form-label">Pregunta {i+1}:</label>
                                <div className="col-sm-3">
                                    <button className ="btn btn-success" onClick={handleModificar} value={i}>Modificar</button>
                                </div>
                                <div className="col-sm-12 mt-2">
                                    <label className="col-form-label" type="text" name="texto" value={item.texto}>{item.texto}</label>
                                </div>
                            </div>
                            <div className="mb-2 row">
                                <div className="col-sm-4">
                                    <label className="col-form-label">Seccion: {item.tipo}</label>
                                </div>
                                <div className="col-sm-8">
                                    <label className="col-form-label">categoria: {item.categoria}</label>
                                </div>
                            </div>
                            <hr />
                        </div>
                    )
                })
                ://Cuando se seleciona una pregunta para modificarla
                <div className="m-3"> 
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Pregunta: </label>
                        <div className="col-sm-9">
                            <input className="form-control" id="texto-pregunta" type="text" name="texto" value={question.texto} onChange ={handleChangeQuestion}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Sección: </label>
                        <div className="col-sm-9" >
                            <select className="form-select" name="tipo" id="selectSecciones" value={indiceCategoria} onChange ={handleChangeQuestion}>
                                <option value="" disabled selected>Selecciona una opción:</option>
                                {
                                    secciones().map( (item,i) => {
                                        return <option value={i}>{item}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div> 
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Categoría: </label>
                        <div  className="col-sm-9">
                            <select className="form-select" name="categoria" id="selectCategories" value={question.categoria} onChange ={handleChangeQuestion}>
                                <option value="" disabled selected>Selecciona una opción:</option>
                                {
                                    categorias[indiceCategoria].categorias.map( (item,i) =>{
                                        return <option value={item.titulo} >{item.titulo}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div> 
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Tipo de pregunta: </label>
                        <div  className="col-sm-9">
                            <select className="form-select" name="modulo" value={question.modulo} onChange ={handleChangeQuestion}>
                                <option value="" disabled selected>Selecciona una opción:</option>
                                {
                                    modulos.map((item) => {
                                        return <option value={item.label}>{item.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {question.modulo === "multiple" &&
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label">Opciones de respuestas: </label>
                                <div className="col-sm-9 mb-3">
                                    <select className="form-select " name="multiples" value={question.multiples} onChange ={handleChangeQuestion}>
                                        <option value={false}>Unica Respuesta</option>
                                        <option value={true}>Multiples Respuestas</option>
                                    </select>
                                </div>
                            <div className="col-sm-12">
                                <button type='button' className="btn btn-outline-secondary" onClick={handleAddRes}>Agregar Respuesta</button>
                            </div>
                        </div>
                    }  
                    {question.modulo === "multiple" &&
                       <div className="form-group" id="opciones">
                       {isModificar &&
                       setModificar(false),
                           res.map( (item,i) => {
                               return item;
                           })
                       }
                       </div>
                    } 
                    {question.modulo === "rango" &&
                        <div className="mb-3 row" id="opcionesRango">
                            <label className="col-sm-2 col-form-label">Inicio:</label>
                            <div className="col-sm-4">
                                <input  className="form-control" type="text" name="inicio" id="inicio" value={(question.modulo === "rango" && question.respuestas.length > 0 )? question.respuestas[0].texto : ""}/>
                            </div>
                            <label className="col-sm-2 col-form-label">Fin:</label>
                            <div className="col-sm-4">
                                <input className="form-control" type="text" name="fin" id="fin" value={(question.modulo === "rango" && question.respuestas.length > 0 )? question.respuestas[1].texto : ""}/>                            
                            </div>
                        </div>
                    }
                    <div className="mb-3 row">
                        <div className="col-sm-6">
                            <button className="btn btn-success" onClick={handleSave}>Guardar</button>
                        </div>
                        <div className="col-sm-6">
                            <button className="btn btn-danger" onClick = {handleSalir}>{"{PorDefinir}"}</button>
                        </div>  
                    </div>
                </div>
            }
        </div>
    )
}

export default ModificarPregunta;