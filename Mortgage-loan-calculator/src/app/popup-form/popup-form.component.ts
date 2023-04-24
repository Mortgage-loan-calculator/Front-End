import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { tap, timestamp } from 'rxjs';
import { CustomerService } from '../admin-panel/services/customer.service';
import { Customer } from '../types';

const fb = new FormBuilder().nonNullable;

@Component({
  selector: 'app-popup-form',
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css'],
})
export class PopupFormComponent {
  @Output() onClose = new EventEmitter<void>();

  constructor(private customerservice: CustomerService) {}

  postForm = fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\u0104-\u017E\s]{1,30}$/),
        Validators.maxLength(30),
      ],
    ],
    phoneNumber: [
      '',
      [Validators.maxLength(20), Validators.pattern(/^[+0-9-]*$/)],
    ],
    email: ['', [Validators.required, Validators.maxLength(30)]],
    ipAddress: [''],
    time: [new Date()],
    action: ['Submitted'],
  });

  emailValidator(control: FormControl): ValidationErrors | null {
    const value = control.value;
    const validRegex =
      /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]{1,30}@[a-zA-Z0-9-]{1,}\.[a-zA-Z]{1,}$/;

    if (!value || value.match(validRegex)) {
      return null;
    } else {
      return { invalidEmail: true };
    }
  }

  get name() {
    return this.postForm.get('name') as FormControl<string>;
  }

  get phoneNumber() {
    return this.postForm.get('phoneNumber') as FormControl<string>;
  }

  get email() {
    return this.postForm.get('email') as FormControl<string>;
  }

  onPostFormSubmit() {
    if (this.postForm.valid) {
      this.customerservice
        .saveCustomerInfo(this.postForm.value as unknown as Customer)
        .pipe(
          tap(() => {
            console.log('Post added: ', this.postForm.value);
            this.postForm.reset();
          })
        )
        .subscribe();
    }
  }
  onPostFormReset() {
    this.postForm.reset();
  }
}
