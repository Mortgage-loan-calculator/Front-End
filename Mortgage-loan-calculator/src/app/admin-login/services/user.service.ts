import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/errors/error-handler.service';
import { Error } from 'src/app/errors/error';

const API_URL = 'https://mortgage-loan-calculator-back-end.onrender.com/auth/';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' }).pipe(
      catchError((error: any) => {
        const httpError = new HttpErrorResponse({
          error: error,
          status: error.status,
          statusText: error.statusText,
          url: error.url,
        });
        this.errorHandler.handleError(error);
        return throwError(httpError);
      })
    );
  }
}
