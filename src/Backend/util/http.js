import axios from 'axios';
import Util from './Util';

class NetworkManager {
    constructor(){
        this.__axios = axios.create({baseURL: Util.Config.backendURL});
    }

    post = async (endpoint, payload) =>{
        let local = localStorage.getItem("user");
        let token = (local == "null") ? 'notoken' : local.token;
        var headers = Util.Config.headers;
        headers['auth-token']=token;
        var result = await this.__axios.post(endpoint, payload, headers).then((response) =>{
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
        let local = localStorage.getItem("user");
        let token = (local == "null") ? 'notoken' : local.token;
        var headers = Util.Config.headers;
        headers['auth-token']=token;
        var result = await this.__axios.put(endpoint, payload, headers).then((response) =>{
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
    globalGet = async (endpoint) => {
        
        let user = JSON.parse(localStorage.getItem('user'));
        let token = user.token;
        let config = {
            headers: {
                'auth-token': token
            }
        };
        var result = await this.__axios.get(endpoint,config);
        return result;
    }
}

export default NetworkManager;