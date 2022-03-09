import React,{useState} from "react";
import { Modal } from "react-bootstrap";
const VerFaltantes = ({faltantes,handleClose,num, primeraRespuesta}) => {
    const [show, setClose] = useState(true);
    const handleShow = (value) => setClose(value);
    
    return <div>
        <Modal
            show={show}
            onHide={()=>{
                handleShow(false);
                handleClose(false);
            }}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="modalTittle">Preguntas faltantes.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {faltantes.map((valor,i) => {
                    let result ="";
                    for(let i = 0; i < valor.length; i++){
                        if(i < 50){
                            result += valor.charAt(i);
                        }
                    }
                    return <div className="col-12 border m-2 p-2" key={i}>{num[i] + ") " + result}...</div>
                })}
            </Modal.Body>
        </Modal>
    </div>
}

export default VerFaltantes;