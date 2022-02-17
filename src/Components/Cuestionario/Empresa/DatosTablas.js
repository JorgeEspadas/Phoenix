import React,{useState} from "react";
import { Modal } from "react-bootstrap";

const DatosTablas = ({handleClose,valores,is35,isModa,textoAdicional}) =>{
    const [show, setClose] = useState(true);
    const handleShow = (value) => setClose(value);

    return (
 
            <div>
                <Modal
                show={show}
                onHide={()=>{
                    handleShow(false);
                    !(handleClose === undefined) ? handleClose(false) : console.log('jejex')
                }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                    {is35 ?
                        <Modal.Header closeButton>
                        <Modal.Title id="modalTittle">Nivel de innovación por Empresa</Modal.Title>
                        </Modal.Header>
                    :
                        isModa ?
                            <Modal.Header closeButton>
                            <Modal.Title id="modalTittle">{"Lo más usado en " + textoAdicional}</Modal.Title>
                            </Modal.Header>
                        :
                            <Modal.Header closeButton>
                            <Modal.Title id="modalTittle">{valores.texto}</Modal.Title>
                            </Modal.Header>
                    }
                    {is35 ?
                        <Modal.Body>
                            {valores.map((op) => {
                                return <div class="row mb-2 border-bottom">
                                        <p className="col-8">{op.nombre}:</p>
                                            <ul class="col-4">
                                                {
                                                    op.resultados.map((result)=>{
                                                        return <li>{result}</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                            })}
                        </Modal.Body>
                
                    :
                        isModa ?
                            <Modal.Body>
                                 <div className="row border-bottom">
                                    <p className="col-10 border-end">Moda</p>
                                    <p className="col-2">Total</p>
                                </div>
                                {valores.map( (op,i) => {
                                    return <div className="row border-bottom">
                                            <p className="col-10 border-end">{(i+1)+") "+op.texto}</p>
                                            <p className="col-2">{op.total}</p>
                                        </div>
                                })}
                            </Modal.Body>
                        :
                            <Modal.Body>
                                {valores.respuestas.map( (op) => {
                                    return <div class="row">
                                            <p className="col-10">{op.empresa}:</p>
                                            <p className="col-2">{parseFloat(Math.round(op.valor * 100) / 100).toFixed(2)}%</p>
                                        </div>
                                })}
                            </Modal.Body>
                    }
                
            </Modal>
        </div>
    )
}

export default DatosTablas;