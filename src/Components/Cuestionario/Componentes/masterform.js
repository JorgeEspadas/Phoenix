import React, {useState} from 'react';
import CategoryForm from './categoryform';

function MasterForm({snackbar, formData}){
    const [respuestas, setRespuesta] = useState({});

    //para poder enviar el formulario respuestas debe tener el mismo size que formData.total
    //las preguntas estan en formData.categorias
    //el map itera sobre formData.categorias y a su vez el modulo de categoryForm itera sobre su arreglo en cuestion.

    //map :v
    return (
        <div>
               {formData.categorias.map((categoria, i) => {
                   return <CategoryForm key={"llave_"+i} preguntas={categoria.preguntas} titulo={categoria._id}></CategoryForm>
               })}
        </div>
    );
}

export default MasterForm;