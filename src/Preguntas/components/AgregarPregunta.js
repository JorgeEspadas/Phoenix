import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import NetworkManager from '../../Backend/util/http';
var categories = null;
var secciones = [];
let categorie = [];
let isData = false;
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
            texto:""
        }]
    });
    const [ data, setData ] = useState(null);
    const [ indice, setIndice ] = useState(0);
    const [ res, setRes ] = useState([]);

    const Opciones = (props) => {
        let valor = props.value;
        return(<Fragment key={valor.toString()}>   
            <div className="mb-3 row">         
                <label className="col-sm-2 col-form-label">Opción:</label>
                <div className="col-sm-8 mb-3">
                    <input  className="form-control" type="text" name={"respuesta_"+valor} id={"opcion"+valor}/>
                </div>
                <div className="col-2">
                <button type='button' onClick={handleEliminar} name={valor} className="btn btn-danger">Eliminar</button> 
                </div>
            </div>
        </Fragment>)
    } 
    //recibe las categorias de la base de datos para pintarlas en los selects
    const recibirCategorias = async () => {
        if(!isData){
            var response = await net.globalGet('/admin/categorias'); 
            console.log(response)
            var rawData = response.data.data;
            categories = rawData;
            if(categories !== null){
                secciones = []
                categories.map((item, i) => {
                    secciones.push(<option key={i} value = {i}>{item.id_categoria}</option>);
                })
                pintarCategorias(0,categories)
                isData = true;
                setData(categories);
            }
        }
    }
    recibirCategorias();//

    const pintarCategorias = (section,data) => {
       categorie = [];
       for(var i in data[section].categorias){
           categorie.push(
               <option value={data[section].categorias[i].titulo} key={data[section].categorias[i].titulo}>{data[section].categorias[i].titulo}</option>
           );
       }
    } 
    
    const handleChange = (e) => {
        let valor;
        if (e.target.value === "true"){
            valor = true;
        }else if(e.target.value === "false"){
            valor = false;
        }else if(e.target.name === "tipo"){
            valor = data[parseInt(e.target.value,10)].id_categoria;
            pintarCategorias(parseInt(e.target.value,10),data);
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
            setIndice(0);
             console.log(res)
        } 
    }

    const obtenerValores = () => {
        let opciones = [];
        let cont = 0;
        let respuesta = {
            id_respuesta:"",
            texto:""
        }
        if(pregunta.modulo === "multiple"){
            res.map( (item, i) => {
                if(item !== null){
                    respuesta.id_respuesta = cont+"";
                    respuesta.texto = document.getElementById("opcion"+i).value;
                    opciones.push(respuesta);
                    respuesta = {};
                    cont++;
                }
            })
        }else if(pregunta.modulo === "rango"){
            let rangos = document.getElementById("opcionesRango").querySelectorAll("input");
            rangos.forEach(item => {
                respuesta.id_respuesta = cont+"";
                respuesta.texto = item.value;
                opciones.push(respuesta);
                respuesta = {};
                cont++;
            })
        }else if(pregunta.modulo === "abierta"){
            respuesta.id_respuesta = cont+"";
            opciones.push(respuesta);
        }
       
        return opciones;
    }
    const handleClick = e => {
        res.push( <Opciones value = {indice} />); 
        setIndice(indice+1);
        ReactDOM.render(res.map((item) => {return item}), document.getElementById('opciones'))
    }

    const handleEliminar = e => {
        let indice = parseInt(e.target.name,10);
        delete  res[indice];
        ReactDOM.render(res.map((item) => {return item}), document.getElementById('opciones'));
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
            opciones.map((item,i) => {
                if(item.texto.trim().length === 0){
                    isVacio = true;
                }
            });

            if(isVacio){
                //Snackbar
                console.log("rellena todas las opciones");
                return;
            }
        }
        pregunta.respuestas = obtenerValores();
        console.log(pregunta)
        let response = await net.globalPost('/admin/preguntas',pregunta);
        console.log(response)  

    }

    return (
        <div className="m-3" >
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Pregunta: </label>
                <div className="col-sm-9">
                    <input className="form-control" type="text" name="texto" onChange={handleChange} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Sección: </label>
                <div className="col-sm-9" >
                    <select className="form-select" name="tipo" id="selectSecciones" onChange={handleChange}>
                        <option value="" disabled selected>Selecciona una opción:</option>
                        {secciones}
                    </select>
                </div>
            </div>  
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">Categoría: </label>
                    <div  className="col-sm-9">
                        <select className="form-select" name="categoria" id="selectCategories" onChange={handleChange}>
                            <option value="" disabled selected>Selecciona una opción:</option>
                            {categorie}
                        </select>
                    </div>
            </div>               
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Tipo de pregunta: </label>
                <div  className="col-sm-9">
                    <select className="form-select" name="modulo" onChange={handleChange}>
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
                        <select className="form-select " name="multiples" onChange={handleChange}>
                            <option value={false}>Unica Respuesta</option>
                            <option value={true}>Multiples Respuestas</option>
                        </select>
                    </div>
                <div className="col-sm-12">
                    <button type='button' className="btn btn-outline-secondary" onClick={handleClick}>Agregar Respuesta</button>
                 </div>
            </div>
        }
        {pregunta.modulo === "multiple" && <div className="form-group" id="opciones"></div>}
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