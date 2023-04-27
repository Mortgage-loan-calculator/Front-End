import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MonthlyPaymentDto,
  MonthlyPaymentResultsDto,
} from '../monthly-payment-dto';

@Injectable({
  providedIn: 'root',
})
export class MonthlyPaymentService {
  constructor(private http: HttpClient) {}

  sendData(
    monthlyPaymentDto: MonthlyPaymentDto
  ): Observable<MonthlyPaymentDto> {
    return this.http.post<MonthlyPaymentDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/monthly-payment/form',
      // 'http://localhost:8080/monthly-payment/form',
      monthlyPaymentDto
    );
  }

  getCalculationResults(
    requestData: MonthlyPaymentDto
  ): Observable<MonthlyPaymentResultsDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<MonthlyPaymentResultsDto>(
      'https://mortgage-loan-calculator-back-end.onrender.com/monthly-payment',
      // 'http://localhost:8080/monthly-payment',
      requestData,
      { headers }
    );
  }

  getEuribor() {
    return this.http.get<number>(
      // 'http://localhost:8080/monthly-payment/euribor');
      'https://mortgage-loan-calculator-back-end.onrender.com/monthly-payment/euribor'
    );
  }

  getTotalInterestRate(requestData: MonthlyPaymentDto): Observable<number> {
    return this.http.post<number>(
      // 'http://localhost:8080/monthly-payment/interest/rate',
      'https://mortgage-loan-calculator-back-end.onrender.com/monthly-payment/interest/rate',
      requestData
    );
  }

  getTotalPaymentSum(requestData: MonthlyPaymentDto): Observable<number> {
    return this.http.post<number>(
      // 'http://localhost:8080/monthly-payment/payment/sum',
      'https://mortgage-loan-calculator-back-end.onrender.com/monthly-payment/payment/sum',
      requestData
    );
  }
}
