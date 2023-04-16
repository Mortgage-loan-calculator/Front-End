import { Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../types';

const fb = new FormBuilder().nonNullable;

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css'],
})
export class CalculatorFormComponent {
  title = 'json-read-example';
  citiesInfo: any;
  url: string = './assets/Cities.json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.url).subscribe((res) => {
      this.citiesInfo = res;
    });
  }
  loanOptions: Options = {
    floor: 1,
    ceil: 30,
  };
  adultOptions: Options = {
    floor: 1,
    ceil: 5,
  };
  numbersOnly(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    const isValid = /^[0-9]*$/.test(value) && value >= 0;
    return isValid ? null : { numbersOnly: { value: control.value } };
  }
  validateMaxNumbers(control: FormControl) {
    const value = control.value;

    if (value && value.toString().length > 12) {
      return { ['maxNumbersReached']: true };
    } else if (value && value.toString().length === 12) {
      return { ['maxNumbersReached']: 'Maximum number of digits reached.' };
    }

    return null;
  }

  errorMessage: string = 'Input should accept only numbers.';

  calculateForm = fb.group(
    {
      homePrice: [
        '',
        [
          Validators.required,
          this.numbersOnly,
          Validators.min(1),
          Validators.max(999999999999),
          this.validateMaxNumbers.bind(this),
        ],
      ],
      familyIncome: [
        '',
        [
          Validators.required,
          this.numbersOnly,
          Validators.min(1),
          Validators.max(999999999999),
          this.validateMaxNumbers.bind(this),
        ],
      ],
      loanSlider: [1],
      familyMemberSlider: [1],
      childrenToggle: [false],
      citySelect: ['', Validators.required],
    },
    { updateOn: 'blur' }
  );

  submitForm = fb.group(
    {
      loanAmount: [''],
      totalPaid: [''],
      fee: [''],
      paymentSum: [''],
    },
    { updateOn: 'blur' }
  );

  applyForm = fb.group(
    {
      dealAmount: [''],
      downpayment: [''],
      loanPeriod: [''],
      estimatedPayment: [''],
      maxPayment: [''],
    },
    { updateOn: 'blur' }
  );

  get homePrice() {
    return this.calculateForm.get(
      'homePrice'
    ) as unknown as FormControl<string>;
  }

  get familyIncome() {
    return this.calculateForm.get(
      'familyIncome'
    ) as unknown as FormControl<string>;
  }

  get loanSlider() {
    return this.calculateForm.get('loanSlider') as FormControl;
  }

  get familyMemberSlider() {
    return this.calculateForm.get('familyMemberSlider') as FormControl;
  }

  get childrenToggle() {
    return this.calculateForm.get('childrenToggle') as FormControl;
  }

  public citySelect(city: string) {
    // return this.calculateForm.get('citySelect')?.value;
    return city;
  }

  actionText: string = '';

  onCalculate() {
    this.actionText = 'Calculated';
    const column2 = document.querySelector('.column2') as HTMLElement;
    column2.style.display = 'block';
  }
  onSubmit() {
    if (this.calculateForm.valid) {
      this.actionText = 'Submitted form';
      const calculateFormData = this.calculateForm.value;
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
  onChange() {}
  showAdvancedOptions = false;
}
