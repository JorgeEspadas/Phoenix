export default class Util {
    static Config = {
        backendURL: 'http://localhost/',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        }
    }

    static Error = (message) => {
        let errorResponse = {
            data: {
                response: "BAD",
                data: {
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