import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
const fb = new FormBuilder().nonNullable;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  loginForm = fb.group(
    {
      username: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{9,}$'
          ),
        ],
      ],
    },
    { updateOn: 'blur' }
  );

  get username() {
    return this.loginForm.get('username') as unknown as FormControl<string>;
  }
  get password() {
    return this.loginForm.get('password') as unknown as FormControl<string>;
  }
  onLoginFormSubmit() {
    const loginFormData = this.loginForm.value;
  }
}
