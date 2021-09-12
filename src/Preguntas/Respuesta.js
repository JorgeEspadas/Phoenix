import React, { Fragment } from 'react';

const Respuesta = (props) => {
    const numbers = props.numbers;
    let listItems = []
    for(let i = 0;i < numbers; i++){
        listItems.push(
            <Fragment key={i.toString()}>
                
                <label
                    className="px-3 py-1">
                    Respuesta {i+1}:
                </label>
                <input 
                    className="mx-3 px-5"
                    type="text" name={"pregunta_"+i} />
                <button type='button'
                    className="px-3 mx-3">
                    Eliminar
                </button>
                <br></br>
        </Fragment>
        )
    }


    

    return (
            <Fragment> {listItems} </Fragment>
    )
}
export default Respuesta;