import { Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const fb = new FormBuilder().nonNullable;

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css']
})
export class CalculatorFormComponent {
  title = 'json-read-example';
  citiesInfo:any;
  url: string = './assets/Cities.json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.url).subscribe(res => {
      this.citiesInfo = res;
    });
  }
  loanOptions: Options = {
    floor: 1,
    ceil: 30
  };
  adultOptions: Options = {
    floor: 1,
    ceil: 5
  };
  cities: Array<string> = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Alytus', 'Marijampolė', 'Utena', 'Telšiai', 'Tauragė'];

  calculateForm = fb.group(
    {
      homePrice: [''],
      familyIncome: [''],
      loanSlider: [1],
      familyMemberSlider: [1],
      childrenToggle: [false],
      citySelect: ['']
    },
    {updateOn: 'blur'}
  );


  submitForm = fb.group(
    {
      loanAmount: [''],
      totalPaid: [''],
      fee: [''],
      paymentSum: ['']

    },
    {updateOn: 'blur'}
  );

  applyForm = fb.group(
    {
      dealAmount: [''],
      downpayment: [''],
      loanPeriod: [''],
      estimatedPayment: [''],
      maxPayment: ['']

    },
    {updateOn: 'blur'}
  );

  get homePrice() {
    return this.calculateForm.get('homePrice') as unknown as FormControl<string>;
  }

  get familyIncome() {
    return this.calculateForm.get('familyIncome') as unknown as FormControl<string>;
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

  get citySelect() {
    return this.calculateForm.get('citySelect')?.value;
  }

  onSubmit() {
    const calculateFormData = this.calculateForm.value;
  }
  onChange() {
  }
  showAdvancedOptions = false;

  

}
