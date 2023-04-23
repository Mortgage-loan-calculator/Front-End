import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
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
  url: string = './assets/Cities.json';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getCities() {
    return this.http.get<any[]>(this.url);
  }

  sendData(calculateFormDto: CalculateFormDto): Observable<CalculateFormDto> {
    return this.http.post<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate/form',
      calculateFormDto
    );
    // .pipe(
    //   catchError((error: any) => {
    //     const httpError = new HttpErrorResponse({
    //       error: error,
    //       status: error.status,
    //       statusText: error.statusText,
    //       url: error.url,
    //     });
    //     this.errorHandler.handleError(error);
    //     return throwError(httpError);
    //   })
    // );
  }

  saveResultData(
    calculateResultsDto: CalculateResultsDto
  ): Observable<CalculateResultsDto> {
    return this.http.post<CalculateResultsDto>(
      'http://localhost:8080/calculate',
      calculateResultsDto
    );
    // .pipe(
    //   catchError((error: any) => {
    //     const httpError = new HttpErrorResponse({
    //       error: error,
    //       status: error.status,
    //       statusText: error.statusText,
    //       url: error.url,
    //     });
    //     this.errorHandler.handleError(error);
    //     return throwError(httpError);
    //   })
    // );
  }

  getCalculationResults(
    homePrice: number,
    loanTerm: number
  ): Observable<CalculateResultsDto> {
    const params = new HttpParams()
      .set('homePrice', homePrice.toString())
      .set('loanTerm', loanTerm.toString());

    return this.http.get<CalculateFormDto>('http://localhost:8080/calculate', {
      params,
    });
    // .pipe(
    //   catchError((error: any) => {
    //     const httpError = new HttpErrorResponse({
    //       error: error,
    //       status: error.status,
    //       statusText: error.statusText,
    //       url: error.url,
    //     });
    //     this.errorHandler.handleError(error);
    //     return throwError(httpError);
    //   })
    // );
  }
}
