import React, {useState} from 'react';
import ModifyUser from './components/ModifyUser';
import CreateUser from './components/UserCreate'

function UserEditor({snackbar}) {

    const [currentModule, setModule] = useState(0);

    const handleClick = (e) =>{
        switch(e.target.value){
            case 'create':
                setModule(1);
            break;
            case 'modificar':
                setModule(2);
            break;
            default:
                setModule(0)
            break;
        }
    }

    // render switchcase

    const moduleRender = (number) => {
        switch(number) {
            case 0:
                return <span></span>
            case 1:
                return <CreateUser snackbar={snackbar}/>
            case 2:
                return <ModifyUser snackbar={snackbar}/>
            case 3:
                return <span>soon(tm)</span>
            default:
                return <span>you should not see this message</span>
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
                        <>
                            {moduleRender(currentModule)}
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserEditor;