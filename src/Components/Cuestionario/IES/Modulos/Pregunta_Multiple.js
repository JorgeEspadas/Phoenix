import React, {useState} from "react";

function PreguntaMultiple({ id, texto, respuestas, callback }) {

    var hasOpenAnswer = false;
    const [openAnswer, setOpenAnswer] = useState('');

    const handleChange = e => {
        // filter response, and send it back to the source through the callback
        if(hasOpenAnswer) {
            callback(e.target.name, e.target.value, openAnswer);
        }else{
            callback(e.target.name, e.target.value);
        }
    }    

    const handleOpenAnswer = e => {
        setOpenAnswer(e.target.value);
    }

    return (
        <div className="container border-bottom px-1">
            <div className="row p-1">
                <div className="col-sm-12 px-1">
                    {texto}
                </div>
                <div className="col-sm-8 p-1">
                    {respuestas.map((res, i) => {
                        if(res.modulo !== undefined) hasOpenAnswer = true;
                        return (
                            <div className="container">
                                <input type="radio" id={id} name={id} value={res.valor} onChange={handleChange}/>
                                <label className="px-2" for={id}>{res.texto}</label>
                                {(res.modulo === undefined) ? <></> : <input type="text" className="col-5" id={id} name={id} onChange={handleOpenAnswer}/>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PreguntaMultiple;