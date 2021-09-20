import md5 from 'md5';

export default class Util {
    static Config = {
        backendURL: 'http://localhost/',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    }
    
    static Hash = (string) => {
        return md5(string);
    }
    
    static nukeAndRedirect =()=>{

    }

    static Error = (message) => {
        let errorResponse = {
            data: {
                response: "BAD",
                data: {
                    exception: {
                        message: 'Error de Servicio'
                    }
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