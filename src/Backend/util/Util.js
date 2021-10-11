import md5 from 'md5';
import { Redirect } from 'react-router';

export default class Util {
    static Config = {
        baseURL: 'http://localhost/',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'auth-token' : (localStorage.getItem("user") == null || localStorage.getItem("user") == "null" || localStorage.getItem("user") == undefined) ? 'notoken' : JSON.parse(localStorage.getItem("user")).token
        }
    }
    
    static Hash = (string) => {
        return md5(string);
    }
    
    static delay = ms => new Promise(res => setTimeout(res, ms));
    static decode = jwt => JSON.parse(jwt.split('.').map((part) => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'),'base64').toString())[1]);

    static Error = (message) => {
        let errorResponse = {
                response: "BAD",
                data: {
                    exception: {
                        message: 'Error de Servicio'
                    }
                }
        }
        return errorResponse;
    }

    static snackbarConfig = {
        options: {
            position: 'bottom-right',
            style: {
                backgroundColor: '#1D1F31',
                border: '2px solid #f6c23e',
                color: 'white',
                fontSize: '20px',
                textAlign: 'center'
            }
        }
    }
}