import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { tap, timestamp } from 'rxjs';
import { CustomerService } from '../services/customer.service';
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
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,30}$/)]],
    phoneNumber: ['', [ Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    ipAddress: [''],
    time: [new Date()],
  });

  getErrorMessage(errors: any): string | undefined {
    if (errors.required) {
      return 'Name is required';
    }
    if (errors.pattern) {
      return 'Name must contain only letters and be between 1 and 30 characters';
    }
    return undefined;
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
