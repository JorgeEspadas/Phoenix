import React, { useState } from 'react';
import Respuesta from './Respuesta';
import ReactDOM from 'react-dom';
import NetworkManager from "../Backend/util/http";

let cont = 1
let categorie =  [];
var categories;
const AgregarPregunta = () => {
    var net = new NetworkManager();
 /*
    const recibirCategorias = async () => {
        var response = await net.globalGet('/admin/categorias/IES');    
        categories = await response.data.data.categorias;
        categories.map( async (cat) =>{
            await categorie.push(cat);
        })

        console.log(categorie);

    }

    recibirCategorias();
*/

    const [ pregunta, registrar ] = useState({
        texto: "",
        tipo:"",
        modulo:"",
        categoria:"",
        multiples:false,
        respuestas:[]
    });
   const [ numRespuestas, guardar ] = useState(1);

    const handleChange = e => {
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
        
        console.log(numRespuestas)
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
                    onChange={handleChange}>
                        <option value="IES">IES</option>
                        <option value="Empresa" selected>Empresa</option>
                    </select>
                    </div>  

                    <div className="py-3">
                        <label
                            className=" px-3">
                        Categoría:
                       </label>
                        <select name="categoria"
                        onChange={handleChange}>
                            <option value="categoria">Categoría</option>
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