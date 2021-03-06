import md5 from 'md5';

export default class Util {

    static context;

    // esto es ilegal.
    static setContext = (value) => {
        this.context = value;
    }

    static Config = {
        baseURL: 'http://192.100.163.15:8080/',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json',
            'auth-token' : (localStorage.getItem("user") === null || localStorage.getItem("user") === "null" || localStorage.getItem("user") === undefined) ? 'notoken' : JSON.parse(localStorage.getItem("user")).token
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
                        message: message
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