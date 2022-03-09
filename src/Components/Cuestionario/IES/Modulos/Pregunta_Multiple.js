import React, {useState} from "react";

function PreguntaMultiple({ id, texto, respuestas, callback, num }) {

    var hasOpenAnswer = false; // indica si la respuesta es o no abierta.
    var answerTexts = []; // guarda los textos de la respuesta (los labels)
    const [openAnswer, setOpenAnswer] = useState(''); // almacena el valor de la respuesta abierta.
    const [answerData, setAnswerData] = useState({});

    const handleChange = e => {
        // filter response, and send it back to the source through the callback
        setAnswerData({i: e.target.name, v: e.target.value})
        if(hasOpenAnswer) {
            callback(e.target.name, e.target.value, answerTexts[e.target.value - 1], openAnswer);
        }else{
            setOpenAnswer('');
            callback(e.target.name, e.target.value, answerTexts[e.target.value - 1], '');
        }
    }    

    const handleOpenAnswer = e => {
        setOpenAnswer(e.target.value);
        callback(id, answerData.v, answerTexts[answerData.v - 1], e.target.value);
    }

    return (
        <div className="container border-bottom px-1">
            <div className="row p-1">
                <p id={id}></p>
                <div className="col-sm-12 px-1">
                    {num +") " + texto}
                </div>
                <div className="col-sm-8 p-1">
                    {respuestas.map((res, i) => {
                        answerTexts.push(res.texto);
                        if(res.modulo !== undefined) hasOpenAnswer = true;
                        return (
                            <div className="container" key = {i}> 
                                <input type="radio" id={id+res.valor} name={id} value={res.valor} onChange={(handleChange)}/>
                                <label className="px-2" for={id+res.valor}>{res.texto}</label>
                                {(res.modulo === undefined) ? <></> : <input type="text" className="col-5" id={id} name={id} onChange={(e=>handleOpenAnswer(e))}/>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PreguntaMultiple;