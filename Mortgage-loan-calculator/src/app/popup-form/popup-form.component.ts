import { getLocaleDateTimeFormat } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
  constructor(private customerservice: CustomerService) {}

  postForm = fb.group({
    name: [''],
    phoneNumber: [''],
    email: [''],
    ipAddress: [''],
    time: [new Date()],
  });

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
