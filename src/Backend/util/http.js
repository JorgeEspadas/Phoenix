import axios from 'axios';

class NetworkManager {
    constructor(){
        this.__axios = axios.create({baseURL: process.env.REACT_APP_BACKEND_URL});
    }

    globalPost = async (endpoint, payload) =>{
        let config = {
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            }
        };

        var result = await this.__axios.post(endpoint, payload, config);
        return result;
    }
}

export default NetworkManager;