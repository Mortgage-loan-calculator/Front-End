import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

import { Observable, Subject, map, of, pipe, startWith, switchMap } from 'rxjs';

import { CalculatorService } from './service/calculator.service';
import { CalculateFormDto, CalculateResultsDto } from './calculate-form-dto';
import {
  MonthlyPaymentDto,
  MonthlyPaymentResultsDto,
} from '../monthly-payment/monthly-payment-dto';
import { MonthlyPaymentComponent } from '../monthly-payment/monthly-payment.component';

const fb = new FormBuilder().nonNullable;
interface City {
  name: string;
  [key: string]: any;
}
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
export class CalculatorFormComponent implements OnInit {
  @ViewChild(PieChartComponent) PieChartComponent!: PieChartComponent;

  title = 'json-read-example';
  citiesInfo: City[] = [];
  calculateFormDto: CalculateFormDto = {} as CalculateFormDto;
  calculateResultsDto: CalculateResultsDto = {} as CalculateResultsDto;

  myControl = new FormControl('');
  cityNames: string[] = [];
  filteredOptions!: Observable<string[]>;

  monthlyPaymentResultsDto: MonthlyPaymentResultsDto =
    {} as MonthlyPaymentResultsDto;
  @ViewChild(MonthlyPaymentComponent)
  monthlyPaymentComponent!: MonthlyPaymentComponent;
  constructor(
    private http: HttpClient,
    private calculatorService: CalculatorService
  ) {}
  ngOnChanges() {
    if (this.citiesInfo != null) {
      this.cityNames = this.citiesInfo.map((city: any) => city.name);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityNames.filter((name) =>
      name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit() {
    this.http.get('./assets/Cities.json').subscribe((res: any) => {
      this.cityNames = res.map((city: any) => city.name);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    });

    this.calculateForm.valueChanges
      .pipe(
        distinctUntilChanged(),

        tap((value) => {
          this.onUpdate(value);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formatLabelLoan(value: number): string {
    if (value >= 30) {
      Math.round(value / 30);
    }

    return `${value}`;
  }
  formatLabelAdult(value: number) {
    if (value === 5) {
      return '5+';
    } else {
      return value.toString();
    }
  }

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
      partnerToggle: [''],

      id: [''],
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
      monthlyFamilyIncome: [
        '',
        [
          Validators.required,
          this.numbersOnly,
          Validators.min(1),
          Validators.max(999999999999),
          this.validateMaxNumbers.bind(this),
        ],
      ],
      loanTerm: [''],
      familyMembers: [''],
      haveChildren: [''],
      citySelect: ['', [Validators.required]],
    },
    { updateOn: 'blur' }
  );

  submitForm = fb.group(
    {
      maxLoan: [''],
      totalInterestPaid: [''],
      agreementFee: [''],
      totalPaymentSum: [''],
    },
    { updateOn: 'blur' }
  );

  applyForm = fb.group(
    {
      partnerToggle: [''],
      dealAmount: [
        '',
        [
          Validators.required,
          this.numbersOnly,
          Validators.min(1),
          Validators.max(999999999999),
          this.validateMaxNumbers.bind(this),
        ],
      ],
      downPayment: [
        '',
        [
          Validators.required,
          this.numbersOnly,
          Validators.min(1),
          Validators.max(999999999999),
          this.validateMaxNumbers.bind(this),
        ],
      ],
      loanPeriod: [
        '',
        [
          Validators.required,
          this.numbersOnly,
          Validators.min(1),
          Validators.max(999999999999),
          this.validateMaxNumbers.bind(this),
        ],
      ],
      monthlyIncome: [
        '',
        [
          Validators.required,
          this.numbersOnly,
          Validators.min(1),
          Validators.max(999999999999),
          this.validateMaxNumbers.bind(this),
        ],
      ],
      estimatedMonthlyPayment: [''],
      maxMonthlyPayment: [''],
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

  get partnerToggle() {
    return this.calculateForm.get('partnerToggle') as FormControl;
  }

  get homePrice() {
    return this.calculateForm.get(
      'homePrice'
    ) as unknown as FormControl<string>;
  }

  get monthlyFamilyIncome() {
    return this.calculateForm.get(
      'monthlyFamilyIncome'
    ) as unknown as FormControl<string>;
  }

  get loanTerm() {
    return this.calculateForm.get('loanTerm') as FormControl;
  }

  get familyMembers() {
    return this.calculateForm.get('familyMembers') as FormControl;
  }

  get haveChildren() {
    return this.calculateForm.get('haveChildren') as FormControl;
  }
  get dealAmount() {
    return this.applyForm.get('dealAmount') as FormControl;
  }
  get downPayment() {
    return this.applyForm.get('downPayment') as FormControl;
  }
  get loanPeriod() {
    return this.applyForm.get('loanPeriod') as FormControl;
  }
  get monthlyIncome() {
    return this.applyForm.get('monthlyIncome') as FormControl;
  }

  public citySelect(city: string) {
    return city;
  }

  actionText: string = '';
  show() {
    const calculateButton = document.querySelector('.calculate-button');
    const column2 = document.querySelector('.column2');
    const calculateBtn = document.getElementById('calculate-btn');
  }

  updateResults(value: any) {
    this.calculatorService
      .getFormCalculationResults(value)
      .subscribe((data: CalculateResultsDto) => {
        this.calculateResultsDto = data;
      });
  }

  onUpdate(value: any) {
    this.updateResults(value);
  }

  onSubmit() {
    if (this.calculateForm.valid) {
      this.calculateFormDto = this.calculateForm.value;
      this.calculateResultsDto = this.submitForm.value;

      this.calculatorService
        .sendData(this.calculateFormDto)
        .subscribe((data: CalculateFormDto) => {
          this.calculateFormDto = data;
        });

      this.updateResults(this.calculateFormDto);

      this.actionText = 'Calculated';
      this.showColumn2 = true;
      this.actionText = 'Submitted form';
      const calculateFormData = this.calculateForm.value;
    }
  }

  calculateMonthly() {
    if (this.applyForm.valid) {
      const formData: MonthlyPaymentDto = this.applyForm.value;
      this.monthlyPaymentComponent.calculateResults(formData);
    }
  }

  handleResultsCalculated(results: MonthlyPaymentResultsDto): void {
    this.applyForm.patchValue({
      estimatedMonthlyPayment: results.estimatedMonthlyPayment,
      maxMonthlyPayment: results.maxMonthlyPayment,
    });
  }

  onChange() {}
  showAdvancedOptions = false;
  showPopup = false;

  showPopupForm() {
    this.showPopup = true;
  }
}
