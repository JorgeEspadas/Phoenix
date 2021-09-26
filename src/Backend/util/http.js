import axios from 'axios';
import Util from './Util';

class NetworkManager {
    constructor(){
        this.__axios = axios.create(Util.Config);
    }

    post = async (endpoint, payload) =>{
        var result = await this.__axios.post(endpoint, payload).then((response) =>{
            if(response.status != 200){
                return Util.Error('Error de Conexion, Codigo: '+response.status);
            }else{
                return response.data;
            }
        }, (error) =>{
            return Util.Error('Error de Red');
        });
        return result;
    }

    put = async (endpoint, payload) => {
        var result = await this.__axios.put(endpoint, payload).then((response) =>{
            if(response.status != 200){
                return Util.Error('Error de Conexion, Codigo: '+response.status);
            }else{
                return response.data;
            }
        }, (error) =>{
            return Util.Error('Error de Red');
        });
        return result;
    }

    //cambiar a get
    get = async (endpoint) => {
        var result = await this.__axios.get(endpoint).then((response) => {
            if(response.status != 200){
                return Util.Error('Error de Conexion, Codigo: '+response.status);
            }else{
                return response.data;
            }
        }, (error) => {
            return Util.Error('Error de Red');
        });
        return result;
    }
}

export default NetworkManager;