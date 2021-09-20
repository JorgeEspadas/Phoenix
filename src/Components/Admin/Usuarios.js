import React from 'react';
import ReactDOM from 'react-dom';
import ModifyUser from './components/ModifyUser';
import CreateUser from './components/UserCreate'

function UserEditor({snackbar}) {
    const handleClick = (e) =>{
        switch(e.target.value){
            case 'create':
                ReactDOM.render(
                    <CreateUser snackbar={snackbar}/>,
                    document.getElementById('editorContainer')
                 ); 
            break;
            case 'modificar':
                ReactDOM.render(
                    <ModifyUser/>,
                    document.getElementById('editorContainer')
                 ); 
            break;
            default:
                ReactDOM.render(
                    <p>Selecciona alguna opcion :D</p>,
                    document.getElementById('editorContainer')
                    ); 
            break;
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className='col-2'>
                <center>
                    <ul className="nav nav-tabs flex-column" style={{'border-bottom' : '0px'}}>
                        <li className="nav-item">
                            <button className="nav-link" href="#" onClick={handleClick} value="create">
                                Crear
                            </button>
                            <button className="nav-link" href="#" onClick={handleClick} value="modificar">
                                Modificar
                            </button>
                        </li>
                    </ul>
                </center>
                </div>
                <div className="col-5">
                    <div className="container" >
                        <div id="editorContainer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserEditor;