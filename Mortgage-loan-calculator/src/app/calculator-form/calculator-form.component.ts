import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

const fb = new FormBuilder().nonNullable;

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css'],

  animations: [
    trigger('form2Animation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('900ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateX(50px)' })),
      ]),
    ]),
  ],
})
export class CalculatorFormComponent {
  private pieChart!: any;

  adultOptions: Options = {
    floor: 1,
    ceil: 5,
    translate: (value: number, label: LabelType): string => {
      if (label === LabelType.Floor) {
        return value.toString();
      } else if (label === LabelType.Ceil) {
        return '5+';
      } else {
        return value.toString();
      }
    },
  };
  @ViewChild(PieChartComponent) PieChartComponent!: PieChartComponent;

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
    floor: 0,
    ceil: 30,
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
      childrenToggle: ['', Validators.required],
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

  showColumn2 = false;
  ngAfterViewInit() {
    const calculateBtn = document.getElementById('calculate-btn');
    const column2 = document.querySelector('.column2');
    calculateBtn?.addEventListener('click', () => {
      column2?.classList.add('show');
    });
  }

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
    this.showColumn2 = true;
    this.pieChart.animateChart();
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
  showPopup = false;

  showPopupForm() {
    this.showPopup = true;
  }
}
