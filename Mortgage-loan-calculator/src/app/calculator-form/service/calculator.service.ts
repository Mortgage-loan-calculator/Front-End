import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CalculateFormDto } from '../calculate-form-dto';


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  url: string = './assets/Cities.json';

  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get<any[]>(this.url);
  }

  sendData(calculateFormDto: CalculateFormDto): Observable<CalculateFormDto> {
    return this.http.post<CalculateFormDto>('/api/calculate', calculateFormDto);
  }

  getCalculationResults(homePrice: number, monthlyIncome: number, loanTerm: number): Observable<CalculateFormDto> {
    const params = new HttpParams()
      .set('homePrice', homePrice.toString())
      .set('monthlyIncome', monthlyIncome.toString())
      .set('loanTerm', loanTerm.toString());
  
    return this.http.get<CalculateFormDto>('/api/calculate', { params });
  }
}
