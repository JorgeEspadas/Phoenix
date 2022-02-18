import axios from 'axios';
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
         * 
         * 
         * Si sale un error  originado aqui, antes de moverle checa que el response en Hydra este siguiendo
         * el protocolo dictado por el responseHandler, enviar algo libre sin el responseHandler hara que esto no retorne.
         * 
         */

        if(response.data.response === undefined) return Util.Error('Error en Backend');

        if(response.data.data.exception === undefined){
            return response.data;
        }else{
            if(response.data.data.exception.action !== undefined){
                Util.context.Logout();
                return Util.Error('Sesion Expirada');
            }else{
                return response.data;
            }
        }
    }

    post = async (endpoint, payload) =>{
        var response = await this.__axios.post(endpoint, payload).then((response) =>{
            if(response.status !== 200){
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
            if(response.status !== 200){
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
            if(response.status !== 200){
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