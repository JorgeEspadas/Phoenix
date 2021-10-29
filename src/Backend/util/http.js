import axios from 'axios';
import { Next } from 'react-bootstrap/esm/PageItem';
import Util from './Util';

class NetworkManager {
    constructor(){
        this.__axios = axios.create(Util.Config);
    }

    validate = (response) => {
        /**
         * El manejo de undefined solo puede bajar hasta cierto punto
         * response.data.data.exception se puede evaluar, por que la llave puede o no estar incluida.
         * Sin embargo, evaluar response.data.data.exception.ACTION dara un Unhandled Rejection
         * .l.
         * 
         */

        //console.log(response.data.data);
        var pincheUnhandled = response.data.data.exception;

        if(pincheUnhandled === undefined){
            return response.data;
        }else{
            if(pincheUnhandled.action !== undefined){
                Util.context.Logout();
                return Util.Error('Sesion Expirada');
            }else{
                return response.data;
            }
        }
    }

    post = async (endpoint, payload) =>{
        var response = await this.__axios.post(endpoint, payload).then((response) =>{
            if(response.status != 200){
                return Util.Error('Error de Conexion, Codigo: '+response.status);
            }else{
                return response;
            }
        }, (error) =>{
            return Util.Error('Error de Red');
        }).catch(function(error){
            return Util.Error('Error de Red');
        });

        return this.validate(response);
    }

    put = async (endpoint, payload) => {
        var response = await this.__axios.put(endpoint, payload).then((response) =>{
            if(response.status != 200){
                return Util.Error('Error de Conexion, Codigo: '+response.status);
            }else{
                return response;
            }
        }, (error) =>{
            return Util.Error('Error de Red');
        }).catch(function(error){
            return Util.Error('Error de Red');
        });

        return this.validate(response);
    }

    //cambiar a get
    get = async (endpoint) => {
        var response = await this.__axios.get(endpoint).then((response) => {
            if(response.status != 200){
                return Util.Error('Error de Conexion, Codigo: '+response.status);
            }else{
                return response;
            }
        }, (error) => {
            return Util.Error('Error de Red');
        }).catch(function(error){
            return Util.Error('Error de Red');
        });
        return this.validate(response);
    }
}

export default NetworkManager;