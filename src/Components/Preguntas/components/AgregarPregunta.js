import React, { useState, Fragment, useEffect } from 'react';
import NetworkManager from '../../../Backend/util/http';
import Opciones from './Opciones';

const AgregarPregunta =  ({snackbar}) => {
    var net = new NetworkManager();
    const [ pregunta, registrar ] = useState({
        texto: "",
        tipo:"",
        modulo:"",
        categoria:"",
        multiples:false,
        respuestas:[{
            id_respuesta:"",
            texto:"",
            abierta:false
        }]
    });
    const [ data, setData ] = useState(null);
    const [ indice, setIndice ] = useState(0);
    const [ indiceRes , setIndiceRes ] = useState(0);
    const [ res, setRes ] = useState([]);
    const [ isModificar, setModificar ] = useState(false);
    const [ check, setCheck ] = useState([])
    const [ isAbierta , setIsAbierta ] = useState([]);
    const [ resetQuestion , setResetQuestion ] = useState(pregunta);
    const resetPregunta = () =>{
        registrar(resetQuestion);
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
        setModificar(true);
    }

    //recibe las categorias de la base de datos para pintarlas en los selects
    const recibirCategorias = async () => {
        var response = await net.get('/admin/categorias'); 
        console.log(response)
        if(response.response === "OK"){
            var rawData = response.data;
            setData(rawData);
        }else{
            snackbar(response.data.exception.message)
        }
    }

    useEffect( () =>{
        recibirCategorias();
    },[])
    
    const handleChange = (e) => {
        let valor;
        if (e.target.value === "true"){
            valor = true;
        }else if(e.target.value === "false"){
            valor = false;
        }else if(e.target.name === "tipo"){
            valor = data[parseInt(e.target.value,10)].id_categoria;
            setIndice(parseInt(e.target.value));
            pregunta.categoria = "";
        }else if(e.target.name === "modulo"){
            if(e.target.value != "multiple"){
                vaciarRes();
            }
            valor = e.target.value;
        }else{
            valor = e.target.value;
        }
        registrar({
            ...pregunta,
            [e.target.name]: valor
        });
    }
    
    const vaciarRes = () => {
        if(res.length !== 0){
            setRes([]);
            setIndiceRes(0);
            setCheck([]);
        } 
    }

    const obtenerValores = () => {
        let opciones = [];
        let cont = 0;
        let respuesta = { id_respuesta:"", texto:"", abierta: false }
        if(pregunta.modulo === "multiple"){
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
        }else if(pregunta.modulo === "abierta"){
            respuesta.id_respuesta = cont+"";
            respuesta.abierta = true;
            respuesta.texto=" ";
            opciones.push(respuesta);
        }
       
        return opciones;
    }
    const handleClick = e => {
        isAbierta.push(false);
        res.push(<Opciones indice = {indiceRes} value={""}  key={ indiceRes.toString() } handleChecked = {handleChecked} handleEliminar = {handleEliminar} isAbierta ={ isAbierta[indiceRes] } />)
        setIndiceRes(indiceRes+1);
        setModificar(true);
    }

    const handleEliminar = e => {
        let deleteIndice = parseInt(e.target.name,10);
        delete  res[deleteIndice];
        delete isAbierta[deleteIndice];
        setModificar(true);
    }
    //Enviara la pregunta
    const handleState = async () => {
        let opciones = obtenerValores();
        if(pregunta.texto.trim().length === 0 || pregunta.tipo.length === 0 || pregunta.modulo.length === 0 || pregunta.categoria.length === 0){
            snackbar("rellena todas los campos");
            return;
        }

        if(pregunta.modulo === "multiple"){
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
                snackbar("rellena todas las opciones");
                return;
            }
            
        }
        pregunta.respuestas = opciones;
        let response = await net.post('/admin/preguntas',pregunta);
        console.log(response)
        if(response.response === "OK"){
            console.log(pregunta);
            resetPregunta();
            snackbar("Pregunta agregada exitosamente")
        }else{
            console.log(response.data.exception.message)
            //snackbar(response.data.exception.message);
        }
    }

    return (
        <div className="m-3" >
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Pregunta: </label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="texto" onChange={handleChange} value={pregunta.texto}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Sección: </label>
                <div className="col-sm-9" >
                    <select className="form-select" name="tipo" id="selectSecciones" value={pregunta.tipo === "" ? "-1":indice} onChange={handleChange}>
                        <option value="-1" disabled selected>Selecciona una opción:</option>
                        {data !== null &&
                            data.map((item, i) => { return <option key={i} value ={i}>{item.id_categoria}</option> })
                        }
                    </select>
                </div>
            </div>  
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Categoría: </label>
                <div  className="col-sm-9">
                    <select className="form-select" name="categoria" id="selectCategories" value = {pregunta.categoria} onChange={handleChange} >
                        <option value="" disabled selected>Selecciona una opción</option>
                        {data !== null &&
                            data[indice].categorias.map((item, i) => { return <option key={item.titulo} value = {item.titulo}>{item.titulo}</option> })
                        }
                    </select>
                </div>
            </div>               
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Tipo de pregunta: </label>
                <div  className="col-sm-9">
                    <select className="form-select" name="modulo" onChange={handleChange} value={pregunta.modulo}>
                        <option value="" disabled selected>Selecciona una opción:</option>
                        <option value="abierta">Abierta</option>
                        <option value="multiple">Opción multiple</option>
                    </select>
                </div>
            </div>           
        {pregunta.modulo === "multiple" &&
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Opciones de respuestas: </label>
                    <div className="col-sm-9 mb-3">
                        <select className="form-select " name="multiples" onChange={handleChange} value={pregunta.multiples}>
                            <option value={false}>Unica Respuesta</option>
                            <option value={true}>Multiples Respuestas</option>
                        </select>
                    </div>
                <div className="col-sm-12">
                    <button type='button' className="btn btn-outline-secondary" onClick={handleClick}>Agregar Respuesta</button>
                 </div>
            </div>
        }
        {pregunta.modulo === "multiple" && 
            <div className="form-group" id="opciones">
            {isModificar &&
            setModificar(false),
                res.map( (item,i) => { return item; })
            }
            </div>
        }
            <center className ="">
                <button className="btn btn-primary" name="btn" onClick={handleState} href="#">Agregar Pregunta</button>
            </center>
        </div>    
    );   
}

export default AgregarPregunta;