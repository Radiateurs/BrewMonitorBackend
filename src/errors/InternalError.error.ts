import {MainError} from "./Error.error";

export class InternalError extends MainError {

    GenerateError() {
        return ({
            error: `Internal error on ${this.type}`,
            message: this.message
        });
    }
}