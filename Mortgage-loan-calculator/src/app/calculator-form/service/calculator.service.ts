import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';

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
    return this.http.post<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate',
      // 'http://localhost:8090/calculate',

      calculateFormDto
    );
  }

  sendDataDetailed(
    calculateFormDto: CalculateFormDto
  ): Observable<CalculateFormDto> {
    return this.http.post<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate/details',
      calculateFormDto
    );
  }

  getFormCalculationResults(object: {
    [key: string]: string;
  }): Observable<CalculateResultsDto> {
    return this.http.post<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate/results',
      // 'http://localhost:8090/calculate/results',

      object
    );
  }

  getCalculationResults(
    requestData: CalculateFormDto
  ): Observable<CalculateResultsDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate',
    //  'http://localhost:8090/calculate',
      requestData,
      { headers }
    );
  }
}
