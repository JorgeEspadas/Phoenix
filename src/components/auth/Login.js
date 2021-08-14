import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const [ user, saveUser ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;
    const handleChance = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    //cuando el usuario quiera iniciar sesión
    const handleSubmint = () => {

    }
    return ( 
        <div className="">
            <div className="">  
                <h1>Inicia Sesión</h1>

                <form
                    onSubmit={handleSubmint}
                >
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

                    <div className="">
                        <input 
                            type="submit"
                            className=""
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to="/signup">Registrarse</Link>
            </div>
        </div>
    );
}
 
export default Login;