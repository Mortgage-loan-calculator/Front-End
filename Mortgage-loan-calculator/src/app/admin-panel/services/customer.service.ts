import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../../types';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/errors/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}
  customerUrl =
    'https://mortgage-loan-calculator-back-end.onrender.com/customers';


    //'http://localhost:8080/customers';


  public getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customerUrl);
  }

  public saveCustomerInfo(customer: Customer) {
    return this.http.post<Customer>(this.customerUrl, customer).pipe(
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

  public deleteCustomer(id: string){
    this.http.delete(this.customerUrl + '/' + id).subscribe(
      (response) => {
        // Handle successful response here
        console.log('Delete request successful:', response);
      },
      (error) => {
        // Handle error here
        console.error('Delete request failed:', error);
      }
    );
  }
}
