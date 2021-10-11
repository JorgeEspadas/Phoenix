import React, {useState} from 'react';
import { Accordion } from 'react-bootstrap';

function MasterForm({snackbar, formData}){
    const [actualCategory, setCategory] = useState(0);
    const [respuestas, setRespuesta] = useState({});

    //map :v
    return (
        <div>
            <Accordion>
               
            </Accordion>
        </div>
    );
}

export default MasterForm;