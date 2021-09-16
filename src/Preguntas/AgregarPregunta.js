import React, { useState, useEffect } from 'react';
import Respuesta from './Respuesta';
import ReactDOM from 'react-dom';
import NetworkManager from '../Backend/util/http';

/**
 *           LLAVE
 * data.data.0|1.
 * 
 * Seccion: data.data.i.id_categoria <- i
 * Categorias
 */

 let cont = 1
 var categories = [];
 var secciones = [];
 let categorie = [];

 var net = new NetworkManager();

 const recibirCategorias = async () => {
    var response = await net.globalGet('/admin/categorias'); 
    console.log(response);
    var rawData = await response.data.data;
    categories = rawData;
    //id categoria es el nombre de la seccion
    //contiene categorias

    categories.map((item, i) => {
        secciones.push(<option key={i} value = {i}>{item.id_categoria}</option>);
    })
}
recibirCategorias();

const AgregarPregunta = () => {

    const [ pregunta, registrar ] = useState({
        texto: "",
        tipo:"",
        modulo:"",
        categoria:"",
        multiples:false,
        respuestas:[]
    });

    const [ numRespuestas, guardar ] = useState(1);
    const [ categoriaValor, setCategoria ] = useState(0);

    const pintarCategorias = (section) => {
       categorie = [];
       for(var i in categories[section].categorias){
           categorie.push(
               <option value={categories[section].categorias[i].titulo} key={categories[section].categorias[i].titulo}>{categories[section].categorias[i].titulo}</option>
           );
       }
       return categorie;
    }

    const handleChange = (e) => {
       
        let valor;
        if (e.target.value === "true"){
            valor = true;
        }else if(e.target.value === "false"){
            valor = false;
        }else if(e.target.name === "tipo"){
            setCategoria(parseInt(e.target.value,10));
            valor = categories[parseInt(e.target.value,10)].id_categoria;
            pintarCategorias(categoriaValor);
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
   
    const handleState = () => {
        console.log(pregunta);
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
                    onChange={handleChange}>
                        {secciones}
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
                                {pintarCategorias(categoriaValor)}
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

                <button
                name="btn"
                onClick={handleState}>
                    estado actual
                </button>
            </div>
        </div>
    );   
}

export default AgregarPregunta;