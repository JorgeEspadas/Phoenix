import React, {useState} from "react";
import StatusModule from "./components/StatusModule";
import '../../css/Status.css';  

function ConfigEditor({ snackbar }) {

    const [currentModule, setModule] = useState(1);

    const handleClick = (e) => {
        switch (e.target.value) {
            case "status":
                setModule(1);
                break;
            case "modificar":
                setModule(2);
                break;
            default:
                setModule(0);
                break;
        }
    };

    // render switchcase

    const moduleRender = (number) => {
        switch (number) {
            case 1:
                return <StatusModule snackbar={snackbar}/>
            default:
                return <span>you should not see this message</span>;
        }
    };

    return (
        <div className="container-fluid principal">
            <div className="row">
                <div className="col-sm-12 col-xl-2 ">
                    <center>
                        <ul className="nav nav-tabs flex-column" id="MenuUsuario">
                            <li className="nav-item ">
                                <button
                                    className="nav-link"
                                    href="/#"
                                    onClick={handleClick}
                                    value="status"
                                >
                                    <i className="fa fa-cog"></i>
                                    &nbsp; Status
                                </button>
                            </li>
                        </ul>
                    </center>
                </div>
                <div className="col-sm-12 col-xl-7 status">
                    <div className="container hijo">
                        <>{moduleRender(currentModule)}</>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfigEditor;