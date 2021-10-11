import React, {useState} from 'react';
import CategoryForm from './categoryform';

function MasterForm({snackbar, formData}){
    const [respuestas, setRespuesta] = useState({});

    //para poder enviar el formulario respuestas debe tener el mismo size que formData.total
    //las preguntas estan en formData.categorias
    //el map itera sobre formData.categorias y a su vez el modulo de categoryForm itera sobre el arreglo de preguntas.

    const sendCuestionario = () => {
        var currentAnswers = Object.keys(respuestas).length;
        if(currentAnswers <= formData.total){
            snackbar('Responde todas las preguntas');
        }
    }

    //map :v
    return (
        <div>
               {formData.categorias.map((categoria, i) => {
                   return <CategoryForm key={"llave_"+i} preguntas={categoria.preguntas} titulo={categoria._id} setRespuesta={setRespuesta}></CategoryForm>
               })}
               <button onClick={sendCuestionario}>Enviar formulario</button>
        </div>
    );
}

export default MasterForm;