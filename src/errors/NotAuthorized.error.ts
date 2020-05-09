import {MainError} from "./Error.error";

export class NotAuthorizedError extends MainError {

    GenerateError() {
        return ({
            error: `Not authorized to access ${this.type}`,
            message: this.message
        });
    }
}