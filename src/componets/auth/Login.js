import React, { useState } from 'react';


const Login = () => {

    const [ user, saveUser ] = useState({
        mail: '',
        password: ''
    });

    const onChance = () => {

    }
    return ( 
        <div className="">
            <div className="">
                <h1>Inicia Sesión</h1>

                <form>
                    <div className="">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tú email"
                            onChange={onChance}
                        />
                    </div>

                    <div className="">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="contraseña"
                            onChange={onChance}
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
            </div>
        </div>
    );
}
 
export default Login;