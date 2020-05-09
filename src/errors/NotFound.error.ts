import { MainError } from './Error.error';

export class NotFoundError extends MainError {

    GenerateError() {
        return ({
            error: `${this.type} not found`,
            message: this.message
        });
    }
}