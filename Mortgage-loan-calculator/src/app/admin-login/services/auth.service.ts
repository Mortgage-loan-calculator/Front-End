import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/errors/error-handler.service';

const AUTH_API =
  'https://mortgage-loan-calculator-back-end.onrender.com/auth/';
  // 'http://localhost:8080/auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(
        AUTH_API + 'signin',
        {
          username,
          password,
        },
        httpOptions
      )
      .pipe(
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
