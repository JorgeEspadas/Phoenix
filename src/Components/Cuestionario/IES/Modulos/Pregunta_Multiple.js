import React from "react";

const handleChange = e => {
    // filter response, and send it back to the source through the callback
}

function PreguntaMultiple({ id, texto, respuestas, callback }) {
    return (
        <div className="container border-bottom px-1">
            <div className="row p-1">
                <div className="col-sm-12 px-1">
                    {texto}
                </div>
                <div className="col-sm-8 p-1">
                    {respuestas.map((res, i) => {
                        return (
                            <div className="container">
                                    <input type="radio" id={id} name={id} value={res.valor} />
                                    <label className="px-2" for={id}>{res.texto}</label>
                                    {(res.modulo === undefined) ? <></> : <input type="text" className="col-5" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PreguntaMultiple;