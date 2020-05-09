export class MainError {
    type: string;
    message: string;

    constructor(type: string, message: string) {
        this.type = type;
        this.message = message;
    }

    GenerateError() {
        return ({
            error: this.type,
            message: this.message
        })
    }
}