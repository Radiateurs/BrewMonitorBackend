import { MainError } from "./Error.error";

export class BadRequestError extends MainError {

    GenerateError() {
        return ({
            error: `Bad request for ${this.type}`,
            message: this.message
        });
    }
}