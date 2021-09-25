import React, { useState } from "react";
import NetworkManager from "../../../Backend/util/http";
const ModificarPregunta = () => {
    var net = new NetworkManager();
    const [ isData , setIsData ] = useState(false);
    const [ data , setData ] = useState([]);
    const [ search, setSearch ] = useState('');
    const [ dataFound , setDataFound ] = useState([]);
    const [ isModify, setModify ] = useState(false);
    const [ question , setQuestion ] = useState({});
    const [ categorias , setCategorias ] = useState([]);

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

    const obtenerPreguntas = async () => {
        if(!isData){
            let response = await net.globalGet('/admin/preguntas'); 
            console.log(response);
            setIsData(true);
            setData(response.data.data);
        }
    }

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

    const handleModificar = async (e) => {
        setQuestion(dataFound[parseInt(e.target.value,10)])
        let response = await net.globalGet('/admin/categorias'); 
        console.log(response)
        setCategorias(response.data.data);
        setModify(true);
    }

    const handleClick = () => {
        setModify(false);
        let busqueda = []
        data.map( (item) => {
            if(item.modulo === search){
                busqueda.push(item);
            }
        })
        setDataFound(busqueda);
    }
    obtenerPreguntas();
    return (
        <div className="my-3 row">
            <div className="my-3 row">
                <div className="col-sm-10">
                    <select className="form-select " name="multiples" onChange={handleSearchbar}>
                        <option value={modulos[0].label} selected>slecciona una opción:</option>
                        {
                            modulos.map((item) => {
                                return <option value={item.label}>{item.label}</option>
                            })
                        }
                    </select>
                </div>
                <div className="col-sm-2">
                <button className="btn btn-primary" onClick={handleClick}>Buscar</button>
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
                :
                <div className="m-3"> 
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Pregunta: </label>
                        <div className="col-sm-9">
                            <input className="form-control" type="text" name="texto" value={question.texto}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Sección: </label>
                        <div className="col-sm-9" >
                            <select className="form-select" name="tipo" id="selectSecciones">
                                <option value="" disabled selected>Selecciona una opción:</option>
                                {
                                    secciones().map( (item) => {
                                        return <option value={item}>{item}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div> 
                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Categoría: </label>
                        <div  className="col-sm-9">
                            <select className="form-select" name="categoria" id="selectCategories">
                                <option value="" disabled selected>Selecciona una opción:</option>
                                {
                                    categorias[0].categorias.map( (item,i) =>{
                                        return <option value="" >{item.titulo}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div> 
                </div>
            }
        </div>
    )
}

export default ModificarPregunta;