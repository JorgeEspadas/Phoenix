import React, { useEffect, useState } from "react";

function RespuestaMultipleAbierta({res, save}) {

    // probablemente ya quedo.

    const [selected, setSelected] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        if(selected){
            save({
                id_respuesta: res.id_respuesta,
                texto: text
            });
        }
    },[selected]);

    const select = () => {
        // select del checkbox
        setSelected(!selected);
    }

    const handleInput = event => {
       setText(event.target.value);
    }

    return (
        <div>
            <input type="checkbox" checked={selected} id={res.id_respuesta} name={res.id_respuesta} onChange={select}/>
            <label className="col-form-label mx-2">{res.texto}</label>
            <input type="text" id={"abierta_" + res.id_respuesta} className="mx-2" name={res.id_respuesta} onChange={handleInput}/>
        </div>
    );
}

export default RespuestaMultipleAbierta;