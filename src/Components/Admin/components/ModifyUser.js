import React, {useState, useEffect} from 'react';
import NetworkManager from '../../../Backend/util/Http';

function ModifyUser() {
    /**
     * En esta pantalla necesito mostrar una barra de busqueda con un boton
     * Dicha barra recibe el email del target y al buscar debo mostrar cualquier tipo de loadingComponent
     * Cuando los datos sean obtenidos, pintar de manera dinamica el mismo (o parecido) formulario de userCreate.
     * Con la modificacion de que algunos valores no estaran para editar como el nombre, email, telefono.
     * Las contrasenas se pueden cambiar, al igual que el rol.
     * 
     * Implementar encripcion de lado del front-end (ya sea algo sencillo como MD5, o SHA1)
     * 
     */

    return (
        <p>Modificar Usuario :v</p>
    );
}

export default ModifyUser;