import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import CreateUser from './components/UserCreate';

function UserEditor() {
    const [menu, setMenu] = useState("main");

    const handleClick = (e) =>{
        switch(e.target.value){
            case 'create':
                ReactDOM.render(
                    <CreateUser/>,
                    document.getElementById('editorContainer')
                 ); 
                break;
        }
    }

    return (
        <div class="container-fluid">
            <div class="row">
                <div class='col-1'>
                    <ul class="nav nav-tabs flex-column" style={{'border-bottom' : '0px'}}>
                        <li className="nav-item">
                            <button className="nav-link" href="#" onClick={handleClick} value="create">
                                Crear
                            </button>
                            <button className="nav-link" href="#" onClick={handleClick} value="create">
                                Modificar
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="col">
                    <div class="container" >
                        <div id="editorContainer"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserEditor;