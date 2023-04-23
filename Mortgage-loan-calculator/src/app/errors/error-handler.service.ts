import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Error } from './error';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      const customError = <Error>(<unknown>error.error);
      let errorMessage = customError.message;
      let errorDetails = '';
      if (customError.errors && customError.errors.length > 0) {
        errorDetails = 'Details:\n' + customError.errors.join('\n');
      }
      window.alert(errorMessage + '\n' + errorDetails);
      return throwError(errorMessage);
    } else if (error.error instanceof ErrorEvent) {
      window.alert('An error occurred.');
      return throwError('An error occurred .');
    } else {
      window.alert('Sorry, an error occurred on the server.');
      return throwError('Sorry, an error occurred on the server.');
    }
  }
}
