import React, {useState} from 'react';
import { Spinner } from 'react-bootstrap';
import NetworkManager from '../../../Backend/util/http';
import Util from '../../../Backend/util/Util';

function CreateUser({snackbar}) {
    const roles = [
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

    const [state, setState] = useState({
        email: '',
        nombre: '',
        rol: roles[0].value,
        password: '',
        passwordConfirmation: '',
        telefono: ''
    });

    const [loading, setLoading] = useState(false);

    const resetState = () => {
        setState({
            email: '',
            nombre: '',
            rol: roles[0].value,
            password: '',
            passwordConfirmation: '',
            telefono: ''
        });
    }

    const handleChange = (e) =>{
        setState(
            {...state,
            [e.target.name] : e.target.value}
        );
        console.log(state);
    }

    const handleSubmit = async () => {
        let nm = new NetworkManager();
        setLoading(true);
        if((state.password === state.passwordConfirmation) && (state.password.length >= 6) && (state.passwordConfirmation.length >= 6)){
            var payload = {
                nombre: state.nombre,
                email: state.email,
                password: Util.Hash(state.password),
                rol: state.rol,
                telefono: state.telefono
            };

            await Util.delay(1000);
            var result = await nm.post('admin/cuentas', payload);
            if(result.response === "OK"){
                //limpiamos el estado
                resetState();
                //mostramos snackbar
                setLoading(false);
                snackbar(result.data.message);
            }else{
                //mostramos snackbar igual por que algo fallo alaverga.
                setLoading(false);
                snackbar(result.data.exception.message);
            }
        }else{
            // snackbar, las contrasenas no coinciden?
            setLoading(false);
            if(state.password.length < 6 && state.password != state.passwordConfirmation){
                snackbar('Las contrasenas debe tener 6 o mas caracteres y deben coincidir!');
            }else{
                snackbar('La contrasena debe tener mas de 6 caracteres');
            }
        }
    }

    return(
        <div>
                <div className="form-group">
                    <label for="nombre">Nombre de la institucion</label>
                    <input type="text" id="nombre" autoComplete="off" name="nombre" className="form-control" onChange={handleChange} value={state.nombre} required/>
                </div>
                <div className="form-group">
                    <label for="email">Correo Electronico</label>
                    <input type="email" autoComplete="off" id="email" name="email" className="form-control" onChange={handleChange} value={state.email} required/>
                </div>
                <div className="form-group">
                    <label for="telefono">Telefono de contacto</label>
                    <input type="text" id="telefono" autoComplete="off" name="telefono" className="form-control" onChange={handleChange} value={state.telefono} required/>
                </div>
                <div className="form-group">
                    <label for="password">Contrasena</label>
                    <input type="password" autoComplete="off" id="password" name="password" className="form-control" onChange={handleChange} value={state.password} required/>
                </div>
                <div className="form-group">
                    <label for="passwordConfirmation">Confirmar contrasena</label>
                    <input type="password" autoComplete="off" id="passwordConfirmation" name="passwordConfirmation" className="form-control" onChange={handleChange} value={state.passwordConfirmation} required/>
                </div>
                <div className="form-group">
                    <label for="rol">Que rol ocupara esta cuenta? </label>
                    <div></div>
                    <select name="rol" onChange={handleChange}>
                        {roles.map((rol)=>(
                            <option key={rol.value} value={rol.value}>{rol.label}</option>
                        ))}
                    </select>
                </div>
                <center>
                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                    {
                        loading ? 
                        <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        /> : 'Registrar'
                    }
                </button>
                </center>
        </div>
    );
}

export default CreateUser;