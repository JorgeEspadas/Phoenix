import React, { useState } from "react";
import RespuestaMultipleAbierta from "./Submodulos/multiple_abierta";

function PreguntaMultiple({data, save}){
    console.log(data);

    // Validar si es abierta o no (deberia llamar abierta.js)
    // Validar si es de multiples opciones o no (multiples -> multiple_x || multiple_unico.js)
    // Cada una requiere un modulo nuevo.

    // Las preguntas abiertas dentro del modulo de multiples preguntas debe ser un checkbox de la misma manera.
    // No se puede poner reglas sobre un wildcard, "abierta", no entra dentro de ninguna categoria de control.
    
    // El behaviour del campo abierto debe ser retornar el texto contenido dentro del input text al oprimir el checkbox.
    // Se me ocurre el problema de que se debe evitar que se retorne la respuesta hacia arriba en el arbol hasta que el checkbox sea presionado.
    // O de que se puede perder la informacion en el transcurso de los eventos.

    const log = (val) =>{
        console.log(val);
    }

    return (
        <div>
           <p>{data.texto}</p> 
           {
               data.respuestas.map( (res,i) => {
                return <div className="col-sm-6">
                    {res.abierta ?
                        <RespuestaMultipleAbierta res={res} save={log}></RespuestaMultipleAbierta>
                    :
                       <div></div>
                    }
                </div>
               })
           }
            <hr />
        </div>
    )
}

export default PreguntaMultiple;