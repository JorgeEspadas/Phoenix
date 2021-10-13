import React from "react";
const Rangos = ({question}) => {
    return (
        <div className="mb-3 row" id="opcionesRango">
            <label className="col-sm-2 col-form-label">Inicio:</label>
            <div className="col-sm-4">
                <input  className="form-control" type="text" name="inicio" id="inicio" defaultValue={(question.modulo === "rango" && question.respuestas.length > 0 )? question.respuestas[0].texto : ""}/>
            </div>
            <label className="col-sm-2 col-form-label">Fin:</label>
            <div className="col-sm-4">
                <input className="form-control" type="text" name="fin" id="fin" defaultValue={(question.modulo === "rango" && question.respuestas.length > 0 )? question.respuestas[1].texto : ""}/>                            
            </div>
        </div>
    )
}

export default Rangos;