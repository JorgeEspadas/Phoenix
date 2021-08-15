import React,{ useState } from 'react';
import clientAxios from '../../config/axios';
import MsgSnackBar from '../MsgSnackBar';

const Singup = () => {

    const [ user, saveUser] = useState({
        telefono: '',
        email:'',
        password:'',
        confirmPass:''
    });

    let [ message, setMessage ] = useState('');

    const handleChange = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const registerUser = async data => {
        try{
            const response = await clientAxios.post('auth/signup', data);
            console.log(response);
        }catch (error){
            console.log("error");
        }
    };


    const handleSubmit = () => {

        if(user.telefono.trim()==="" || user.email.trim() ==="" || user.password.trim() === "" || user.confirmPass.trim()===""){
            
            return;

        }

        if(user.password.length < 8){
            console.log("la contraseña debe tener almenos 8 caracteres");
            return;
        }

        if(user.password !== user.confirmPass){
            console.log("las contraseñas no coinciden");
            return;
        }
        
        const userSend = {
            telefono: user.telefono,
            email: user.email,
            password: user.password
        }  

        registerUser(userSend);
        
    }
     
      
    return ( 
       
    <div className="">  
        <h1>Registrate</h1>
            <div className="">
                <label htmlFor="telefono">Telefono</label>
                <input
                    type="phone"
                    id="telefono"
                    name="telefono"
                    placeholder="Telefono"
                    value={user.telefono}
                    onChange={handleChange}
                />
            </div>


            <br></br>
            <div className="">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Tú email"
                    value={user.email}
                    onChange={handleChange}
                />
                </div>
            <br></br>

            <div className="">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="contraseña"
                    value={user.password}
                    onChange={handleChange}
                />
            </div>

            <br></br>
            <div className="">
                <label htmlFor="confirmPass">Confirmar contraseña</label>
                <input
                    type="password"
                    id="confirmPass"
                    name="confirmPass"
                    placeholder="Confirmar contraseña"
                    value={user.confirmPass}
                    onChange={handleChange}
                />
            </div>


            <br></br>
            <div className="">
                <button onClick={handleSubmit}>Registrarse</button>
            </div>
    </div> 
    );
}
 
export default Singup;