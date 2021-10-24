import React from "react";

function PreguntaMultiple({data}){
    return (
        <div>
           <p>{data.texto}</p> 
           {
               data.respuestas.map( (res,i) => {
                   return<div className="col-sm-6">
                    {res.abierta ?
                         <div>
                            <input type="checkbox" id={"abierta_"+i} className="mx-2" name={i}/>
                            <label className="col-form-label">{res.texto}</label>
                         </div>
                    :
                        <div>
                            <label className="col-form-label">{res.texto}</label>
                            <input type="text" id={"abierta_"+i} className="mx-2" name={i} />
                        </div>
                    }
                  
               </div>
               })
           }
            <hr />
        </div>
    )
}

export default PreguntaMultiple;