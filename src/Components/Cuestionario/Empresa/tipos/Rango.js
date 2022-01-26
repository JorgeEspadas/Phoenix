import React, {useEffect, useState} from "react";

const Rango = ({pregunta, callback,numero}) => {
    const [ rango , setRango ] = useState([]);
    
    const handleChange = e => {
        callback(e.target.name, [e.target.value],"rango");
    }  

    useEffect( () =>{
        let auxRango =[];
        let inicio = parseInt(pregunta.opciones[0].texto,10);
        let fin = parseInt(pregunta.opciones[1].texto,10);

        for(let i = fin; i > inicio; i--){
            auxRango.push(i);
        }

        setRango(auxRango);
    },[]);

    return (
        <div>
            <div class="py-2">{numero+") "+pregunta.texto}</div>
            <div class="col-md-2"><select class="form-select" name={pregunta._id} onChange={handleChange}>
                {
                    rango.map( (r) =>{
                        return <option value={r} key={r}>{r}</option>
                    })
                }
                </select></div>
        </div>
    )
}

export default Rango;