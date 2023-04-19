import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../admin-login/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  loginUrl =
    'https://mortgage-loan-calculator-back-end.onrender.com/auth/signin';

  public PostLogin(login: login) {
    return this.http.post<login>(this.loginUrl, login);
  }
}
