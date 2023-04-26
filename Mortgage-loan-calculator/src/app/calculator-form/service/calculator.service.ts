import {
  HttpClient,

  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';


import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { CalculateFormDto, CalculateResultsDto } from '../calculate-form-dto';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/errors/error-handler.service';
import { Error } from 'src/app/errors/error';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  sendValue(value: any) {
    throw new Error('Method not implemented.');
  }
  url: string = './assets/Cities.json';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getCities() {
    return this.http.get<any[]>(this.url);
  }

  sendData(calculateFormDto: CalculateFormDto): Observable<CalculateFormDto> {
    return this.http
      .post<CalculateFormDto>(
        'https://mortgage-loan-calculator-back-end.onrender.com/calculate',
        calculateFormDto
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

  sendDataDetailed(
    calculateFormDto: CalculateFormDto
  ): Observable<CalculateFormDto> {
    return this.http.post<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate/detailed',
      calculateFormDto
    );

  }

  getFormCalculationResults(object: {
    [key: string]: string;
  }): Observable<CalculateResultsDto> {

    return this.http
      .post<CalculateFormDto>(
        'https://mortgage-loan-calculator-back-end.onrender.com/calculate/results',
        object
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
  getFormCalculationResultsButton(
    calculateFormDto: CalculateFormDto
  ): Observable<CalculateResultsDto> {
    return this.http.post<CalculateFormDto>(
      // 'http://localhost:8080/calculate/results',
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate/results',
      calculateFormDto
    );
  }

  getCalculationResults(
    requestData: CalculateFormDto
  ): Observable<CalculateResultsDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<CalculateFormDto>(
        'https://mortgage-loan-calculator-back-end.onrender.com/calculate',
        requestData,
        { headers }
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
