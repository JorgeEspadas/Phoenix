import React,{ useState } from 'react';
import clientAxios from '../../config/axios';

const Singup = () => {

    const [ user, saveUser] = useState({
        name: '',
        email:'',
        password:'',
        confirmPass:''
    });

    const { name, email, password, confirmPass } = user;

    const handleChance = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const registerUser = async data => {
        try{
            const response = await clientAxios.post('api/user', data);
            console.log(response);
        }catch (error){
            console.log("error");
        }
    };


    const handleSubmint = () => {
        if(name.trim()==="" || email.trim() ==="" || password.trim() === "" || confirmPass.trim()===""){
            console.log("campos obligatorios");
            return;
        }

        if(password.length < 8){
            console.log("la contraseña debe tener almenos 8 caracteres");
            return;
        }

        if(password !== confirmPass){
            console.log("las contraseñas no coinciden");
            return;
        }
        
        const userSend = {
            name: name,
            email: email,
            password: password
        }  

        registerUser(userSend);
        
    }
     
      
    return ( 
       
    <div className="">  
        <h1>Registrate</h1>

        <form
            onSubmit={handleSubmint}
        >

            <div className="">
                <label htmlFor="name">Nombres</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombres"
                    value={name}
                    onChange={handleChance}
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
                    value={email}
                    onChange={handleChance}
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
                    value={password}
                    onChange={handleChance}
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
                    value={confirmPass}
                    onChange={handleChance}
                />
            </div>


            <br></br>
            <div className="">
                <input 
                    type="submit"
                    className=""
                    value="registrarse"
                />
            </div>
        </form>
    </div> 
    );
}
 
export default Singup;