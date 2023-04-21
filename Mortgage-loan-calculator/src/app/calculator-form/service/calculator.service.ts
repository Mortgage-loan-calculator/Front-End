import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CalculateFormDto, CalculateResultsDto } from '../calculate-form-dto';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  sendValue(value: any) {
    throw new Error('Method not implemented.');
  }
  url: string = './assets/Cities.json';

  constructor(private http: HttpClient) {}

  getCities() {
    return this.http.get<any[]>(this.url);
  }

  sendData(calculateFormDto: CalculateFormDto): Observable<CalculateFormDto> {
    return this.http.post<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate',

      calculateFormDto
    );
  }

  // saveResultData(
  //   calculateResultsDto: CalculateResultsDto
  // ): Observable<CalculateResultsDto> {
  //   return this.http.post<CalculateResultsDto>(
  //     'https://mortgage-loan-calculator-back-end.onrender.com/calculate',
  //     calculateResultsDto
  //   );
  // }

  getFormCalculationResults(object: {
    [key: string]: string;
  }): Observable<CalculateResultsDto> {
    return this.http.post<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate/results',
      object
      );
}
}


  getCalculationResults(
    requestData: CalculateFormDto
  ): Observable<CalculateResultsDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate',
      //'http://localhost:8080/calculate',
      requestData,
      { headers }
    );
  }
}
