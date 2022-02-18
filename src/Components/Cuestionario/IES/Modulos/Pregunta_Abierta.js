import React from "react";

function PreguntaAbierta({ modulo, callback }) {
    const handleChange = e => {
        callback(e.target.name, e.target.value);
    }

    return (
        <div className="container border-bottom px-1 p-2">
            <div className="row p-1">
                <div className="col-sm-7 px-1">
                    {modulo.texto}
                </div>
                <div className="col-sm-5 px-1">
                    <input type="text" className="form-control" id={modulo.id} name={modulo.id} onChange={handleChange}/>
                </div>
            </div>
        </div>
    );
}

export default PreguntaAbierta;