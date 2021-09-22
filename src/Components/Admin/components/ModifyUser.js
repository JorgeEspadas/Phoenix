import React, {useContext, useState} from 'react';
import { Spinner } from 'react-bootstrap';
import NetworkManager from '../../../Backend/util/Http';
import Util from '../../../Backend/util/Util';
import { AuthContext } from '../../auth/AuthProvider';

function ModifyUser({snackbar}) {
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
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmit] = useState(false);
    const [deleteLoading, setDelete] = useState(false);
    const [disableEdit, setEdit] = useState(false);
    const [recoveredData, setData] = useState(null);

    const roles = [
        {
            label: "Publico",
            value: 0
        },
        {
            label: "IES",
            value: 1
        },
        {
            label: "Empresa",
            value: 2
        },
        {
            label: "Administrador",
            value: 3
        }
    ];

    const handleSearchbar = (e) =>{
        setSearch(e.target.value);
    }

    const handleSearch = async() =>{
        let nm = new NetworkManager();
        var local = JSON.parse(localStorage.getItem("user"));
        try{
            setLoading(true);
            await Util.delay(1000);
            var result = await nm.globalGet('admin/cuentas/'+search,);
            snackbar('Informacion obtenida');
            setLoading(false);
            setEdit(result.data.data.email == local.email);
            setData(result.data.data);
        }catch(error){
            snackbar(error.toString());
            setLoading(false);
        }
    }

    const handleRolChange = (e) => {
        setData({
            ...recoveredData,
            [e.target.name] : e.target.value
        })
    }
    
    const submitBtn = async() => {
        let nm = new NetworkManager();
        var payload = {rol:parseInt(recoveredData.rol, 10)}
        try{
            setSubmit(true);
            await Util.delay(1000);
            console.log(payload);
            var result = await nm.put('admin/cuentas/'+recoveredData.email,payload);
            if(result.response === "OK"){
                snackbar(result.data.message);
            }else{
                console.log(result.response);
                snackbar('Ocurrio un error');
            }
            setSubmit(false);
        }catch(error){
            snackbar(error.toString())
            setSubmit(false);
        }
    }

    const deleteBtn = () => {

    }

    return (
        <div>
        <span style={{height: '100px'}}></span>
            <div className="form-inline">
                <input 
                    type="email"
                    id="searchEmail"
                    name="searchEmail"
                    className="form-control px-10"
                    onChange={handleSearchbar}
                    value={search}
                    required
                />
                <span style={{width: '10px'}}></span>
                <button className="btn btn-primary" onClick={handleSearch}>
                {
                    loading ? 
                    <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    /> : 'Buscar'
                }</button>
            </div>
            <hr></hr>
            {
                (recoveredData != null) 
                &&
                <div>
                <div className="form-group">
                    <label for="nombre">Nombre de la institucion</label>
                    <input type="text" id="nombre" autoComplete="off" name="nombre" className="form-control" value={recoveredData.nombre} disabled/>
                </div>
                <div className="form-group">
                    <label for="email">Correo Electronico</label>
                    <input type="email" autoComplete="off" id="email" name="email" className="form-control" value={recoveredData.email} disabled/>
                </div>
                <div className="form-group">
                    <label for="rol">Que rol ocupara esta cuenta? </label>
                    <div></div>
                    <select name="rol" onChange={handleRolChange} >
                        {roles.map((rol)=>(
                            <option key={rol.value} value={rol.value} selected={(recoveredData.rol == rol.value)}>{rol.label}</option>
                        ))}
                    </select>
                </div>
                <hr></hr>
                {
                    (disableEdit) && <div><center>No puedes modificar tu propio usuario.</center></div>
                }
                <div className="row">
                <span style={{height:'10px'}}></span>
                    <button type="button" class="btn btn-success" onClick={submitBtn} disabled={disableEdit}>
                        {
                            submitLoading ? 
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            /> : 'Guardar'
                        }
                    </button>
                    <span style={{height:'10px'}}></span>
                    <button type="button" class="btn btn-danger" disabled={disableEdit} onClick={deleteBtn}>
                        {
                            deleteLoading ? 
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            /> : 'Borrar'
                        }
                    </button>
                </div>
                </div>
            }
        </div>
    );
}

export default ModifyUser;