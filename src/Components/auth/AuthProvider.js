import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      localStorage.removeItem("user");
      console.log(error);
    }
  }, [user]);

  const contextValue = {
    user,
    Login(payload) {
      //Conenctado a la base de datos: primero hacemos la verificacion de Autentificacion y luego se pasaria la info al useState
      setUser(payload);
    },
    Logout() {
      // Se haria la peticion y si resulta exitosa
      setUser(null);
    },
    isLogged() {
      return !!user;
    },
    getRol() {
      if(!!user){
        return user.rol;
      }else{
        return 0;
      }
    },
    getToken() {
      return (!!user ? user.token : 'notoken')
    }
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
