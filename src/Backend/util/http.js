import axios from 'axios';

class NetworkManager {
    constructor(){
        this.__axios = axios.create({baseURL: process.env.REACT_APP_BACKEND_URL});
    }


    globalPost = async (endpoint, payload) =>{
        //let user = JSON.parse(localStorage.getItem('user'));
        let config = {
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                 //'auth-token':user.token
            }
        };

        var result = await this.__axios.post(endpoint, payload, config);
        return result;
    }

    globalGet = async (endpoint) => {
        
        //let user = JSON.parse(localStorage.getItem('user'));
        
        let config = {
            headers: {
                //'auth-token':user.token
            }
        };
        var result = await this.__axios.get(endpoint,config);
        return result;
    }
}

export default NetworkManager;