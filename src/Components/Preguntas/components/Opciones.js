import React from "react";
const Opciones = ({ indice , value , handleChecked , handleEliminar , isAbierta }) => {
    const valor = indice;
    return( 
        <div className="mb-3 row">
            <div className="row">
                <label className="col-sm-3 col-form-label">Opción:</label>
                <div className="col-sm-9 mb-3">
                    <input  className="form-control" type="text" name={"respuesta_"+valor} id={"opcion"+valor} defaultValue={value}/>
                </div>
            </div>         
            <div className="mb-2 row">
                <div className="col-sm-6">
                    <label className="col-form-label">Abierta</label>
                    <input type="checkbox" id={"abierta_"+valor} className="mx-2" name={valor} onClick={handleChecked} 
                    defaultChecked={isAbierta}/>
                </div>
                <div className="col-sm-6">
                    <button type='button' onClick={handleEliminar} name={valor} className="btn btn-danger">Eliminar</button> 
                </div>
            </div>
        </div>
    )
} 

export default Opciones;