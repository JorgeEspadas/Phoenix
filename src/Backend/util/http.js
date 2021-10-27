import axios from 'axios';
import { Next } from 'react-bootstrap/esm/PageItem';
import Util from './Util';

class NetworkManager {
    constructor(){
        this.__axios = axios.create(Util.Config);
    }

    validate = (response) => {
        if(response.data.data.exception.action != undefined){
            Util.context.Logout();
        }else{
            console.log(response);
            return response.data;
        }
    }

    post = async (endpoint, payload) =>{
        return await this.__axios.post(endpoint, payload).then((response) =>{
            if(response.status != 200){
                return Util.Error('Error de Conexion, Codigo: '+response.status);
            }else{
                console.log(response.data.data.exception.action === undefined);
                
            }
        }, (error) =>{
            return Util.Error('Error de Red');
        }).catch(function(error){
            return Util.Error('Error de Red');
        });
    }

    put = async (endpoint, payload) => {
        return await this.__axios.put(endpoint, payload).then((response) =>{
            if(response.status != 200){
                return Util.Error('Error de Conexion, Codigo: '+response.status);
            }else{
                return this.validate(response);
            }
        }, (error) =>{
            return Util.Error('Error de Red');
        }).catch(function(error){
            return Util.Error('Error de Red');
        });
    }

    //cambiar a get
    get = async (endpoint) => {
        return await this.__axios.get(endpoint).then((response) => {
            if(response.status != 200){
                return Util.Error('Error de Conexion, Codigo: '+response.status);
            }else{
                return this.validate(response);
            }
        }, (error) => {
            return Util.Error('Error de Red');
        }).catch(function(error){
            return Util.Error('Error de Red');
        });
    }
}

export default NetworkManager;