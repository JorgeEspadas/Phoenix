import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Util from '../../Backend/util/Util';

export default function useAuth() {
  const contextValue = useContext(AuthContext); // EL objeto que trae el User
  Util.setContext(contextValue);
  return contextValue;
}
