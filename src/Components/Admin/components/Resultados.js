import React, {useState} from "react";
import ResultadoEmpresas from "../resultados/ResultdosEmpresas";
import ResultadosIES from '../resultados/ResultadosIES';

function ResultViewer({ snackbar }) {
    const [currentModule, setModule] = useState(0);

    const handleClick = (e) => {
        switch (e.target.value) {
            case "ies":
                setModule(1);
                break;
            case "alumnos":
                setModule(2);
                break;
            case "empresas":
                setModule(3);
                break;
            default:
                setModule(0);
                break;
        }
    };

    // render switchcase

    const moduleRender = (number) => {
        switch (number) {
            case 0:
                return <div></div>
            case 1:
                return <ResultadosIES snackbar={snackbar}/>
            case 2:
                return <div></div>
            case 3:
                return <ResultadoEmpresas />
            default:
                return <span>you should not see this message</span>;
        }
    };

    return (
        <div className="container-fluid" style={{ padding: "1rem" }}>
            <div className="row">
                <div className="col-sm-12 col-xl-2">
                    <center>
                        <ul className="nav nav-tabs flex-column" id="MenuUsuario">
                            <li className="nav-item">
                                <button
                                    className="nav-link"
                                    href="/#"
                                    onClick={handleClick}
                                    value="ies"
                                >
                                    <i className="fa fa-plus-square"></i>
                                    &nbsp; IES
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="nav-link"
                                    href="/#"
                                    onClick={handleClick}
                                    value="alumnos"
                                >
                                    <i className="fa fa-plus-square"></i>
                                    &nbsp; Alumnos
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="nav-link"
                                    href="/#"
                                    onClick={handleClick}
                                    value="empresas"
                                >
                                    <i className="fa fa-plus-square"></i>
                                    &nbsp; Empresas
                                </button>
                            </li>
                        </ul>
                    </center>
                </div>
                <div className="col-sm-12 col-xl-8">
                    <div className="container">
                        <>{moduleRender(currentModule)}</>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultViewer;