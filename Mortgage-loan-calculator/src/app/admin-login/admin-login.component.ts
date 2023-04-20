import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {AuthService} from "./services/auth.service";
import {StorageService} from "./services/storage.service";
const fb = new FormBuilder().nonNullable;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  showMyClass = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private storageService: StorageService) { }
  loginForm = fb.group(
    {
      username: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*\\d)[a-zA-Z\\d]{8,}$'
          ),
        ],
      ],
    },
    { updateOn: 'change' }
  );

  get username() {
    return this.loginForm.get('username') as unknown as FormControl<string>;
  }
  get password() {
    return this.loginForm.get('password') as unknown as FormControl<string>;
  }
  onLoginFormSubmit(): void {
    console.log(this.username.value + this.password.value)
    this.authService.login(this.username.value, this.password.value).subscribe({
      next: data => {
        this.storageService.saveToken(data.accessToken)
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        if(this.roles.includes('ROLE_ADMIN'))
        {
          window.location.href = '/admin';
        }
        else {
          this.showMyClass = false;
        }

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
