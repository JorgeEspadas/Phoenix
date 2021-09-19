import React, { useState } from 'react';
import Respuesta from './Respuesta';
import ReactDOM from 'react-dom';
import NetworkManager from '../Backend/util/Http';


 let cont = 1
 var categories = null;
 var secciones = [];
 let categorie = [];
 let isData = false;

const AgregarPregunta = () => {
    var net = new NetworkManager();
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
    const [ data, setData ] = useState(null);
    //const [ isData, setIsData ] = useState(false);
    
    const recibirCategorias = async () => {
        console.log(isData)
        if(!isData){
            console.log("estoy aqui")
            var response = await net.globalGet('/admin/categorias'); 
            console.log(response)
            var rawData = await response.data.data;
            categories = await rawData;
            if(categories !== null){
                
            //id categoria es el nombre de la seccion
            //contiene categorias
            // https://stackoverflow.com/questions/62653450/how-to-fix-expected-to-return-a-value-in-arrow-function-with-reactjs
                secciones = []
                categories.map((item, i) => {
                    secciones.push(<option key={i} value = {i}>{item.id_categoria}</option>);
                })
                pintarCategorias(categoriaValor,categories)
                //setIsData(true);
                setData(categories);
                isData = true;
                /* ReactDOM.render(
                    secciones,
                    document.getElementById("selectSecciones")
                ) */
                setCategoria(categoriaValor+1);
            }
           
        }
    }

    recibirCategorias();

    const pintarCategorias = (section,data) => {
       categorie = [];
       for(var i in data[section].categorias){
           categorie.push(
               <option value={data[section].categorias[i].titulo} key={data[section].categorias[i].titulo}>{data[section].categorias[i].titulo}</option>
           );
       }
       /* ReactDOM.render(
        categorie,
        document.getElementById("selectCategories")
    ) */
    }
    
    const handleChange = (e) => {
       
        let valor;
        if (e.target.value === "true"){
            valor = true;
        }else if(e.target.value === "false"){
            valor = false;
        }else if(e.target.name === "tipo"){
            valor = data[parseInt(e.target.value,10)].id_categoria;
            pintarCategorias(categoriaValor,data);
            setCategoria(parseInt(e.target.value,10));
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
                                {categorie}
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