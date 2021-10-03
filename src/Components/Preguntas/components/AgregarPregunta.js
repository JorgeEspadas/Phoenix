import React, { useState, Fragment, useEffect } from 'react';
import NetworkManager from '../../../Backend/util/http';
const AgregarPregunta =  () => {
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

    const resetPregunta = () =>{
        registrar({
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
        let valor = props.value;
        return(<Fragment key={valor.toString()}>   
            <div className="mb-3 row">
                <div className="row">
                    <label className="col-sm-3 col-form-label">Opción:</label>
                    <div className="col-sm-9 mb-3">
                        <input  className="form-control" type="text" name={"respuesta_"+valor} id={"opcion"+valor}/>
                    </div>
                </div>         
                <div className="mb-2 row">
                    <label className="col-sm-6 col-form-label" for="abierta">Abierta
                        <input type="checkbox" id={"abierta_"+valor} className="mx-2" name={"abierta_"+valor} onClick={handleChecked}/>
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
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name
        let abierto = check;
        if(value){
            if(check.length === 0){
                abierto.push(name);
            }else{
                if(!abierto.includes(name)){
                    abierto.push(name);
                }
            }
        }else{
            abierto.splice(abierto.indexOf(name),1)
        }
        setCheck(abierto);
        console.log(check)
    }
    //recibe las categorias de la base de datos para pintarlas en los selects
    const recibirCategorias = async () => {
        var response = await net.get('/admin/categorias'); 
        console.log(response)
        if(response.response === "OK"){
            var rawData = response.data;
            setData(rawData);
        }else{
            console.log(response.data.data.exception.message)
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
        let respuesta = {
            id_respuesta:"",
            texto:"",
            abierta: false
        }
        if(pregunta.modulo === "multiple"){
            res.map( (item, i) => {
                if(item !== null){
                    respuesta.id_respuesta = cont+"";
                    respuesta.texto = document.getElementById("opcion"+i).value;
                    if(check.includes("abierta_"+i)){
                        respuesta.abierta = true;
                    }else{
                        respuesta.abierta = false;
                    }
                    opciones.push(respuesta);
                    respuesta = {};
                    cont++;
                }
            })
        }else if(pregunta.modulo === "rango"){
            let rangos = document.getElementById("opcionesRango").querySelectorAll("input");
            rangos.forEach( (item) => {
                respuesta.id_respuesta = cont+"";
                respuesta.texto = item.value;
                opciones.push(respuesta);
                respuesta = {};
                cont++;
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
        res.push(<Opciones value = {indiceRes} />);
        setIndiceRes(indiceRes+1);
        setModificar(true);
    }

    const handleEliminar = e => {
        let deleteIndice = parseInt(e.target.name,10);
        let abierto = "abierta_"+deleteIndice;
        delete  res[deleteIndice];
        if(check.includes(abierto)){
            check.splice(check.indexOf(abierto),1)
        }
        setModificar(true);
    }
    //Enviara la pregunta
    const handleState = async () => {
        if(pregunta.texto.trim().length === 0 || pregunta.tipo.length === 0 || pregunta.modulo.length === 0 || pregunta.categoria.length === 0){
            //Snackbar
            console.log("rellena todas los campos");
            return;
        }

        if(pregunta.modulo === "multiple" || pregunta.modulo === "rango"){
            let opciones = obtenerValores();
            let isVacio = false;
            if(opciones.length !== 0){
                opciones.map((item,i) => {
                    if(item.texto.trim().length === 0){
                        isVacio = true;
                    }
                });
            }else{
                console.log("No se han agregado las opciones de respuesta")
                return;
            }

            if(isVacio){
                //Snackbar
                console.log("rellena todas las opciones");
                return;
            }
            
        }
        pregunta.respuestas = obtenerValores();
        console.log(pregunta)
        let response = await net.post('/admin/preguntas',pregunta);
        console.log(response)
        resetPregunta();  
        console.log(pregunta);

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
                    <select className="form-select" name="tipo" id="selectSecciones" onChange={handleChange}>
                        <option value="" disabled selected>Selecciona una opción:</option>
                        {data !== null &&
                            data.map((item, i) => {
                                return <option key={i} value ={i}>{item.id_categoria}</option>
                            })
                        }
                    </select>
                </div>
            </div>  
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Categoría: </label>
                <div  className="col-sm-9">
                    <select className="form-select" name="categoria" id="selectCategories" onChange={handleChange} >
                        <option value="" disabled selected>Selecciona una opción</option>
                        {data !== null &&
                            data[indice].categorias.map((item, i) => {
                                return <option key={item.titulo} value = {item.titulo}>{item.titulo}</option>
                            })
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
                        <option value="rango">Rango</option>
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
                res.map( (item,i) => {
                    return item;
                })
            }
            </div>
        }
        {pregunta.modulo === "rango" &&
            <div className="mb-3 row" id="opcionesRango">
                <label className="col-sm-2 col-form-label">Inicio:</label>
                <div className="col-sm-4">
                    <input  className="form-control" type="text" name="inicio" id="inicio"/>
                </div>
                <label className="col-sm-2 col-form-label">Fin:</label>
                <div className="col-sm-4">
                    <input className="form-control" type="text" name="fin" id="fin"/>                            
                </div>
            </div>
        }
            <center className ="">
                <button className="btn btn-primary" name="btn" onClick={handleState} href="#">Agregar Pregunta</button>
            </center>
        </div>    
    );   
}

export default AgregarPregunta;