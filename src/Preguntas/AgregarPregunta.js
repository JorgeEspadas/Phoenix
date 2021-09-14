import React, { useState, useEffect } from 'react';
import Respuesta from './Respuesta';
import ReactDOM from 'react-dom';
import NetworkManager from "../Backend/util/http";
import { ContactSupportOutlined } from '@material-ui/icons';

let cont = 1

/**
 *           LLAVE
 * data.data.0|1.
 * 
 * Seccion: data.data.i.id_categoria <- i
 * Categorias
 */


const AgregarPregunta = () => {
    var categories;
    var secciones = [];
    let categorie = [];
    const [ pregunta, registrar ] = useState({
        texto: "",
        tipo:"",
        modulo:"",
        categoria:"",
        multiples:false,
        respuestas:[]
    });

   const [ numRespuestas, guardar ] = useState(1);

   var net = new NetworkManager();

const recibirCategorias = async () => {
    var response = await net.globalGet('/admin/categorias'); 
    console.log(response);
    var rawData = await response.data.data;

    categories = rawData;

    //id categoria es el nombre de la seccion
    //contiene categorias

        for(var i in rawData){
            await secciones.push(
                <option value={i} key={rawData[i].id_categoria} name={rawData[i].id_categoria}
                >{rawData[i].id_categoria}</option>
            );
        }
        ReactDOM.render(secciones, document.getElementById('selectSecciones'));
    }
    
    useEffect ( () => {
        // El useEffect recibe un parametro vacio o con alguna dependencia (como por ejemplo ajustar valores de retorno)
        // Si no se tiene un parametro indicador al final ([]) esto refrescara el estado y rerenderizara la pantalla. pendejo.
        recibirCategorias();
    }, []);

    

    const handleSeccion = e =>{
        let section = parseInt(e.target.value,10);
        categorie = [];
        for(var i in categories[section].categorias){
            categorie.push(
                <option value="categoria" key={categories[section].categorias[i].titulo}>{categories[section].categorias[i].titulo}</option>
            );
        }
        ReactDOM.render(
            categorie,
            document.getElementById('selectCategories')); 
    }

    const handleChange = (e) => {
        let valor;
        if (e.target.value === "true"){
            valor = true;
        }else if(e.target.value === "false"){
            valor = false;
        }else{
            valor = e.target.value;
        }

        registrar({
            ...pregunta,
            [e.target.name]: valor
        });
    }
    
    
    const handleClick = () => {
        ReactDOM.render(
        <Respuesta numbers={numRespuestas} />,
          document.getElementById('respuestas')
        );
        cont+=1;
        guardar(cont);
    }
   

    return (
        <div className="" >
            <h1>Agregar pregunta</h1>
            <div>
                <form className="formulario" >
                    <div className="py-3">
                        <label
                            className=" px-3">
                        Texto:
                       </label>
                        <input 
                            className="inputLogin px-3"
                            type="text" name="texto"
                            onChange={handleChange} />
                    </div>

                    <div className="py-3">
                        <label
                            className=" px-3">
                        Sección:
                       </label>
                    <select name="tipo"
                    id="selectSecciones"
                    onChange={handleSeccion}>
                    </select>
                    </div>  

                    <div className="py-3">
                        <label
                            className=" px-3">
                        Categoría:
                       </label>
                       <select 
                            name="categoria"
                            id="selectCategories"
                            onChange={handleChange}>
                        </select>
                    </div>         
                                
                    <div className="py-3">
                        <label
                            className=" px-3">
                        Tipo de pregunta:
                       </label>
                       <select name="modulo"
                       onChange={handleChange}>
                            <option value="abierta">Abierta</option>
                            <option value="multiple">Opción multiple</option>
                            <option value="rango">Rango</option>
                        </select>
                    </div>           
                    {pregunta.modulo === "multiple" &&

                        <div className="py-3">
                             <label
                                className=" px-3">
                                Opciones de respuestas:
                            </label>
                            <select name="multiples"
                                onChange={handleChange}
                                className="px-3 mx-3">
                            <option value={false}>Unica Respuesta</option>
                            <option value={true}>Multiples Respuestas</option>
                        </select>

                            <button type='button'
                                className="px-3"
                                onClick={handleClick}>
                                Agregar Respuesta
                            </button>
                        </div>
                    }
                    
                    <div className="py-3" id="respuestas">

                    </div>
                </form>
            </div>
        </div>
    );   
}

export default AgregarPregunta;