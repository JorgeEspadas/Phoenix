import React from "react";

const Abierta = ({pregunta,callback, numero, snackbar}) =>{
    const handleChange = e => {
        let valor;
        if(parseInt(e.target.value.trim(),10)<0){
            snackbar("Números negativos no permitidos.");
            valor = e.target.placeholder;
        }else{
            valor = e.target.value;
        }
        callback(e.target.name,[{texto: valor}], "abierta");
    }  
    return (
        <div className="mb-2"> 
            <div className="py-2">{numero+") "+pregunta.texto}</div>
            {
                pregunta._id === "empresas_37.1" || pregunta._id === "empresas_38.1" || pregunta._id === "empresas_39.1" || pregunta._id === "empresas_40.1" || pregunta._id === "empresas_41.1" ?
                 <div><label className="px-3">{pregunta.opciones[0].texto}</label> <input className="col-md-1" type="number"  name={pregunta._id} onChange={handleChange} min="0" pattern="^[0-9]+"></input></div>
                :
                <div><label className="px-3">{pregunta.opciones[0].texto}</label> <input type="text"  name={pregunta._id} onChange={handleChange}></input></div>
            }
                
        </div>
    )
}

export default Abierta;