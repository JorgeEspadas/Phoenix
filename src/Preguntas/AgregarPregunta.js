import React, { useState, useEffect } from 'react';
import Respuesta from './Respuesta';
import ReactDOM from 'react-dom';

let cont = 1

/**
 *           LLAVE
 * data.data.0|1.
 * 
 * Seccion: data.data.i.id_categoria <- i
 * Categorias
 */


const AgregarPregunta = (props) => {
    
     let categorie = [];
     var categories = props.categories;
     
    var secciones = props.secciones;
    
    const [ pregunta, registrar ] = useState({
        texto: "",
        tipo:"",
        modulo:"",
        categoria:"",
        multiples:false,
        respuestas:[]
    });

   const [ numRespuestas, guardar ] = useState(1);

    const handleSeccion = e => {
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