import React, {useState} from 'react';
import NetworkManager from '../../../Backend/util/Http';

function CreateUser() {
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
        if((state.password === state.passwordConfirmation) && (state.password.length > 6) && (state.passwordConfirmation.length > 6)){
            var payload = {
                nombre: state.nombre,
                email: state.email,
                password: state.password,
                rol: state.rol,
                telefono: state.telefono
            };

            var result = await nm.post('admin/cuentas', payload);
            if(result.data.response === "OK"){
                //limpiamos el estado
                resetState();
                //mostramos snackbar
            }else{
                //mostramos snackbar igual por que algo fallo alaverga.
            }
        }else{
            // snackbar, las contrasenas no coinciden?
            console.log('Las contrasenas no coinciden culero');
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
                <button className="btn btn-primary" onClick={handleSubmit}>Registrar?</button>
        </div>
    );
}

export default CreateUser;