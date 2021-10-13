import React, { useEffect, useState, Fragment } from "react";
import NetworkManager from "../../../Backend/util/http";
import Opciones from "./Opciones";
import Rangos from "./Rangos";
const ModificarPregunta = ({snackbar}) => {
    var net = new NetworkManager();
    const [ empresa , setEmpresa ] = useState([]);
    const [ ies , setIes ] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ dataFound , setDataFound ] = useState([]);
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
    const tipo = [ { label: "IES", value: 0 } , { label: "Empresa", value: 1 } ];
    const modulos = [ { label: "abierta", value: 0 } , { label: "multiple",  value: 1 } , { label: "rango",  value: 2 } ];
    const multiples = [ { label: "Unica Respuesta" , value: false } , { label: "Multiples Respuestas" , value: true } ]
    const [ resetQuestion , setResetQuestion ] = useState(question);
    const [ num, setNum ] = useState("");
   
    const resetPregunta = () =>{
        setQuestion(resetQuestion);
        vaciarRes();
    }

    const handleChecked = e => {
        const target = e.target;
        const name = target.name;
        if(isAbierta[parseInt(name,10)]){
            isAbierta[parseInt(name,10)] = false;
        }else{
            isAbierta[parseInt(name,10)] = true;
        }
        console.log(num)
        setNum(parseInt(name,10))
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
            setEmpresa(response.data.empresa);
            setIes(response.data.ies);
            obtenerCategorias(response.data.empresa.concat(response.data.ies));
        }else{
            snackbar(response.data.exception.message);
        }
        
    }

    const obtenerCategorias = (preguntas) => {
        let empresas = [];
        let ies = [];
        let categorias = [];
        preguntas.map((item) => {
            item.preguntas.map( (pregunta) =>{
                if(pregunta.tipo === "IES"){
                    ies.push(pregunta.categoria)
                }else{
                    empresas.push(pregunta.categoria)
                }
            })
        })
        ies = new Set(ies);
        empresas = new Set(empresas);
        categorias.push([...ies]);
        categorias.push([...empresas]);
        setCategorias(categorias);
    }

    useEffect (() => {
        obtenerPreguntas()
    },[])

    const secciones = () => {
        let secciones = []
        tipo.map( (item) => { secciones.push(item.label) });
        return secciones;
    }

    const handleSearchbar = (e) =>{
        setSearch(parseInt(e.target.value),10);
    }

    const obtenerValores = () => {
        let opciones = [];
        let cont = 0;
        let respuesta = { id_respuesta:"", texto:"", abierta: false }

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

    const handleModificar = (e) => {
        let pregunta = dataFound[parseInt(e.target.value,10)];
        setQuestion(pregunta);
        setId(pregunta.id_pregunta);
        respuesta_abierta(pregunta);
        imprimeRespuestas(pregunta);
        setIndiceCategoria(search);
        setModify(true);
    }
    
    const respuesta_abierta = (pregunta) => {
        if(pregunta.modulo==="multiple") pregunta.respuestas.map( (item) => { isAbierta.push(item.abierta) });
    }

    const imprimeRespuestas = (pregunta) => {
        if(pregunta.modulo === "multiple"){
            let cont = 0;
            pregunta.respuestas.map( (item,i) => {
                res.push(<Opciones indice={i} value={item.texto} handleChecked = {handleChecked} handleEliminar = {handleEliminar} isAbierta ={isAbierta[i]} key={i.toString()}/>);
                cont+=1;
            })
            setIndiceRes(cont);
        }
    }

    const handleClick = () => {
        setModify(false);
        vaciarRes();
        let busqueda = []
        if(search===0){
            ies.map((item) => { item.preguntas.map((pregunta) => { busqueda.push(pregunta) }) })
        }else if(search===1){
            empresa.map((item) => { item.preguntas.map( (pregunta) => { busqueda.push(pregunta) }) })
        }
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
            tipo.map((item) => {
                if(parseInt(e.target.value,10) === item.value){
                    valor = item.label;
                }
            })
            setIndiceCategoria(parseInt(e.target.value),10);
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
        res.push(<Opciones indice = {indiceRes} value={""}  key={indiceRes.toString() } handleChecked = {handleChecked} handleEliminar = {handleEliminar} isAbierta ={ isAbierta[indiceRes]}/>);
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
            if(question.tipo === "IES"){
               let datos = modificacion(question.id_pregunta, ies);
                if(datos.numCategoria === -1){
                    let datos = modificacion(question.id_pregunta, empresa);
                    empresa[datos.numCategoria].preguntas.splice(datos.numPregunta,1);
                    ies.map((categoria) =>{
                        if(categoria._id === question.categoria){
                           categoria.preguntas.push(question);
                        }
                    })
                }else{
                    ies[datos.numCategoria].preguntas[datos.numPregunta] = question;
                }
               setIes(ies);
            }else{
                let datos = modificacion(question.id_pregunta, empresa);
                if(datos.numCategoria === -1){
                    let datos = modificacion(question.id_pregunta, ies);
                    ies[datos.numCategoria].preguntas.splice(datos.numPregunta,1);
                    empresa.map((categoria) =>{
                        if(categoria._id === question.categoria){
                           categoria.preguntas.push(question);
                        }
                    })
                }else{
                    empresa[datos.numCategoria].preguntas[datos.numPregunta] = question;
                }
            }
            setEmpresa(empresa);
            snackbar(response.data.message);
        }else{
            snackbar(response.data.exception);
        }
    }

    const modificacion = (id, tipo) => {
        let datos = {
            numCategoria:-1,
            numPregunta:-1
        }
        tipo.map((item,i) => {
            item.preguntas.map( (pregunta,j) =>{
                if(pregunta.id_pregunta === id){
                    console.log("cambiado")
                    datos.numCategoria = i;
                    datos.numPregunta = j;
                }
            })
        })
        return datos;
    }

    const handleSalir = e =>{
        resetPregunta();
        setModify(false);
    }

    return (
        <div className="my-3 row">
            <div className="my-3 row" id="buscar">
                <div className="col-sm-10">
                    <select className="form-select " name="selectTipo" onChange={handleSearchbar} id="select-buscar" defaultValue={""}>
                        <option value={""} disabled selected>slecciona una opción:</option>
                        {
                            tipo.map((item) => {
                                return <option value={item.value} key={item.label}>{item.label}</option>
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
                            <select className="form-select" name="tipo" id="selectSecciones" defaultValue={indiceCategoria} onChange ={handleChangeQuestion}>
                                <option value="" disabled selected>Selecciona una opción:</option>
                                {
                                    secciones().map( (item,i) => {
                                        return <option value={i} key={item}>{item}</option>
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
                                    categorias[indiceCategoria].map( (item) =>{
                                        return <option value={item} key={item}>{item}</option>
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
                                        return <option value={item.label} key={item.label}>{item.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {question.modulo === "multiple" &&
                        <div className="mb-3 row">
                            <label className="col-sm-3 col-form-label">Opciones de respuestas: </label>
                                <div className="col-sm-9 mb-3">
                                    <select className="form-select " name="multiples" defaultValue={question.multiples} onChange ={handleChangeQuestion}>
                                        {multiples.map( (item) => { return <option value={item.value}>{item.label}</option> } )}
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
                           res.map( (item) => {
                               return item;
                           })
                       }
                       </div>
                    } 
                    {question.modulo === "rango" &&
                        <Rangos question={question}/>
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