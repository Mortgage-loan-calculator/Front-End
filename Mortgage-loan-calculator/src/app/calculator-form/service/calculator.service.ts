import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CalculateFormDto, CalculateResultsDto } from '../calculate-form-dto';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  url: string = './assets/Cities.json';

  constructor(private http: HttpClient) {}

  getCities() {
    return this.http.get<any[]>(this.url);
  }

  sendData(calculateFormDto: CalculateFormDto): Observable<CalculateFormDto> {
    return this.http.post<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate/form',
      calculateFormDto
    );
  }

  saveResultData(
    calculateResultsDto: CalculateResultsDto
  ): Observable<CalculateResultsDto> {
    return this.http.post<CalculateResultsDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate',
      calculateResultsDto
    );
  }

  getCalculationResults(
    homePrice: number,
    loanTerm: number
  ): Observable<CalculateResultsDto> {
    const params = new HttpParams()
      .set('homePrice', homePrice.toString())
      .set('loanTerm', loanTerm.toString());

    return this.http.get<CalculateFormDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/calculate',
      { params }
    );
  }
}
