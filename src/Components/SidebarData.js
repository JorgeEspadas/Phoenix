import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import EstadisticasIcon from '@material-ui/icons/Equalizer';
import InfoIcon from '@material-ui/icons/ImportContacts';
import ContactoIcon from '@material-ui/icons/Mail';


export const SidebarData = [
    {
        Modulo: "Home",
        Icono: <HomeIcon/>,
        Link: "/HomePage"
    },
    {
        Modulo: "Estadisticas",
        Icono: <EstadisticasIcon/>,
        Link: "/EstadisticasPage"
    },
    {
        Modulo: "Info",
        Icono: <InfoIcon/>,
        Link: "/InfoPage"
    },
    {
        Modulo: "Contactanos",
        Icono: <ContactoIcon/>,
        Link: "/ContactoPage"
    }
];
    

