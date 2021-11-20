import React from "react";

const handleChange = e => {
    // filter response, and send it back to the source through the callback
}

function PreguntaAbierta({modulo, callback}){
    return (
        <div className="container border-bottom px-1 p-2">
            <div className="row p-1">
                <div className="col-sm-7 px-1">
                    {modulo.texto}
                </div>
                <div className="col-sm-5 px-1">
                    <input type="text" id={modulo.id} name={modulo.id}/>
                </div>
            </div>
        </div>
    );
}

export default PreguntaAbierta;