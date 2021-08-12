import { Icon } from '@material-ui/core';
import React from 'react';
import '../css/Sidebar.css';
import {SidebarData} from './SidebarData';
import ComputerIcon from '@material-ui/icons/DesktopWindows';

//Obtiene datos de SidebarData.js para construir el Menu
function Sidebar() {
    return (
        <div className='Sidebar'>
            <div className='NombreProyecto'>
                <h3>Observatorio</h3>
            </div>
            <div>
                <ul className='SidebarModulos'>
                    {SidebarData.map((val, key) => {
                        return(
                        <li key={key} 
                            className='Modulos'
                            id={window.location.pathname == val.Link ? "activo" : ""}
                            onClick={ ()=> window.location.pathname = val.Link }> 
                                <div id='Icono'>{val.Icono}</div>
                                <div id='Nombre'>{val.Modulo}</div>
                        </li>);
                    })}
                </ul>
            </div>
            
        </div>
    )
}

export default Sidebar


