import axios from 'axios';
import Util from './Util';

class NetworkManager {
    constructor(){
        this.__axios = axios.create({baseURL: Util.Config.backendURL});
    }

    post = async (endpoint, payload) =>{
        let local = localStorage.getItem("user");
        console.log(local);
        return Util.Error.errorResponse;
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