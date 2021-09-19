import axios from 'axios';

class NetworkManager {
    constructor(){
        this.__axios = axios.create({baseURL: process.env.REACT_APP_BACKEND_URL});
    }

    post = async (endpoint, payload) =>{
        let userLog = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'auth-token' : (userLog.token) ?? ''
            }
        };

        var result = await this.__axios.post(endpoint, payload, config);
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