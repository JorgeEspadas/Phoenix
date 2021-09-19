export default class Util {
    static Config = {
        backendURL: 'http://localhost/'
    }

    static Error = {
        errorResponse: {
            data: {
                response: "BAD",
                data: {
                    message: "Fallo de solicitud"
                }
            }
        }
    }
}