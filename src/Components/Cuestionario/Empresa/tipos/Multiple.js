import React,  {useState} from 'react';
import {Accordion} from 'react-bootstrap';

const Multiple = ({pregunta,indice, callback}) => {

    const [opciones,setOpciones] = useState([]);
    const [id,setId] = useState([]);
    
    const handleChange = e => {
        let multiple = opciones;
        let ids = id;
        
        if(e.target.type === "radio"){
            multiple = [];
            multiple = {
                _id: e.target.id,
                texto: e.target.value
            };
        }else{
            if(e.target.placeholder !== ""){
                if(ids.includes((e.target.id).replace(""+e.target.name,""))){
                    let indice = ids.indexOf((e.target.id).replace(""+e.target.name,""));
                    ids.splice(indice,1);
                    multiple.splice(indice,1);
                    if(e.target.value.trim() !== ""){
                        ids.push((e.target.id).replace(""+e.target.name,""));
                        multiple.push({
                            _id: (e.target.id).replace(""+e.target.name,""),
                            texto: document.getElementById(e.target.id).value,
                            abierta:true
                        });
                    }
                }else{
                    ids.push((e.target.id).replace(""+e.target.name,""));
                    multiple.push({
                        _id: (e.target.id).replace(""+e.target.name,""),
                        texto: document.getElementById(e.target.id).value,
                        abierta:true
                    });
                }
            }else{
                if(ids.includes(e.target.id)){
                    let indice = ids.indexOf(e.target.id);
                    ids.splice(indice,1);
                    multiple.splice(indice,1);
                }else{
                    ids.push(e.target.id);
                    multiple.push({
                        _id: e.target.id,
                        texto: e.target.value
                    }); 
                }
            }
        }

        let valor = multiple;

        setId(ids);
        setOpciones(multiple);
        callback(e.target.name, valor);      
    } 

    return(
        <div class="mb-2">
            <div class="py-2">{pregunta.texto}</div>
                {
                    pregunta.opciones.map( (opcion, i) =>{
                        if(!pregunta.multiples){
                            return <div key={i}><label class="px-3"><input type="radio" id={opcion.opcion_id} name={pregunta._id} value={opcion.texto} onChange={handleChange}/> {opcion.texto}</label></div>
                        }else{
                            if(!opcion.abierta){
                                return <div key={i}><label class="px-3"><input type="checkbox" id={opcion.opcion_id}  name={pregunta._id} value={opcion.texto} onChange={handleChange}/> {opcion.texto}</label></div>
                            }else{
                                return <div key={i} class="px-3"><input type="text" id={pregunta._id +""+opcion.opcion_id} name={pregunta._id} onChange={handleChange} placeholder={opcion.texto} ></input></div>
                            }
                        }
                        
                    })
                }
        </div>
    )
}

export default Multiple;