import { Error } from './error.model';
import { EventEmitter } from '@angular/core';


export class ErrorService {

    errorOcurred = new EventEmitter<Error>();

    constructor() { }

    handleError(error: any) {
        const errorData = new Error(error.title, error.error.message)
        this.errorOcurred.emit(errorData);
    }

}