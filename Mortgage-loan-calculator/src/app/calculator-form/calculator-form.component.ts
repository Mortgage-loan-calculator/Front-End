import { LabelType, Options } from '@angular-slider/ngx-slider';
import { expandCollapse } from './animations';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  takeUntil,
  tap,
} from 'rxjs/operators';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
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
import { MonthlyPaymentService } from '../monthly-payment/service/monthly-payment.service';

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
    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('500ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('500ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class CalculatorFormComponent implements OnInit {
  @ViewChild(PieChartComponent) PieChartComponent!: PieChartComponent;
  errorTrue = 'true';
  spinnerOn = false;
  showMore: boolean = false;
  title = 'json-read-example';
  citiesInfo: City[] = [];
  calculateFormDto: CalculateFormDto = {} as CalculateFormDto;
  calculateResultsDto: CalculateResultsDto = {} as CalculateResultsDto;

  myControl = new FormControl<string | City>('');
  options: City[] = [];
  filteredOptions!: Observable<City[]>;

  monthlyPaymentResultsDto: MonthlyPaymentResultsDto =
    {} as MonthlyPaymentResultsDto;

  @ViewChild(MonthlyPaymentComponent)
  monthlyPaymentComponent!: MonthlyPaymentComponent;

  euriborValue!: number;
  fixedRate!: string;
  totalInterestRate!: number;
  totalPaymenSum!: number;

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  constructor(
    private http: HttpClient,
    private calculatorService: CalculatorService,
    private monthlyPaymentService: MonthlyPaymentService
  ) {}
  displayFn(city: City): string {
    return city && city.name ? city.name : '';
  }
  ngOnInit() {
    this.http.get('./assets/Cities.json').subscribe((res: any) => {
      this.options = res.map((city: any) => ({ name: city.name }));
      this.filteredOptions = this.citySelect.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.options.slice();
        })
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
    this.applyForm.valueChanges
      .pipe(
        distinctUntilChanged(),

        tap((value) => {
          this.onUpdateMonthly(value);
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
      partnerToggle: [false],

      id: [''],
      homePrice: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.min(1),
          Validators.maxLength(12),
          (control: FormControl) => {
            if (
              control.value &&
              (control.value.includes('-') || isNaN(control.value))
            ) {
              return { invalidNumber: true };
            }
            return null;
          },
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
          (control: FormControl) => {
            if (
              control.value &&
              (control.value.includes('-') || isNaN(control.value))
            ) {
              return { invalidNumber: true };
            }
            return null;
          },
        ],
      ],
      loanTerm: ['1', Validators.required],

      familyMembers: [''],

      haveChildren: [false],
      citySelect: [<string | City>'', [Validators.pattern(/^[^0-9]*$/)]],
      buyOption: [''],
      studentLoan: [''],
      otherLoan: [''],
      politicalyExposed: [''],
    },
    { updateOn: 'change' }
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
      partnerToggle: [false],
      dealAmount: [
        '',
        [
          Validators.required,
          this.numbersOnly,
          Validators.min(1),
          Validators.max(999999999999),
          this.validateMaxNumbers.bind(this),
          (control: FormControl) => {
            if (
              control.value &&
              (control.value.includes('-') || isNaN(control.value))
            ) {
              return { invalidNumber: true };
            }
            return null;
          },
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
          this.validateMaxNumbers.bind(this),
          (control: FormControl) => {
            if (
              control.value &&
              (control.value.includes('-') || isNaN(control.value))
            ) {
              return { invalidNumber: true };
            }
            return null;
          },
        ],
      ],
      loanPeriod: ['1', Validators.required],
      monthlyIncome: [
        '',
        [
          Validators.required,
          this.numbersOnly,
          Validators.min(1),
          Validators.max(999999999999),
          this.validateMaxNumbers.bind(this),
          this.validateMaxNumbers.bind(this),
          (control: FormControl) => {
            if (
              control.value &&
              (control.value.includes('-') || isNaN(control.value))
            ) {
              return { invalidNumber: true };
            }
            return null;
          },
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
  get loanPeriod() {
    return this.applyForm.get('loanPeriod') as FormControl;
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

  get monthlyIncome() {
    return this.applyForm.get('monthlyIncome') as FormControl;
  }

  get partnerStatus() {
    return this.applyForm.get('partnerToggle') as FormControl;
  }

  get citySelect() {
    return this.calculateForm.controls.citySelect;
  }
  get buyOption() {
    return this.calculateForm.controls.buyOption;
  }
  get studentLoan() {
    return this.calculateForm.controls.studentLoan;
  }
  get otherLoan() {
    return this.calculateForm.controls.otherLoan;
  }
  get politicalyExposed() {
    return this.calculateForm.controls.politicalyExposed;
  }

  actionText: string = '';
  show() {
    const calculateButton = document.querySelector('.calculate-button');
    const column2 = document.querySelector('.column2');
    const calculateBtn = document.getElementById('calculate-btn');
  }

  updateResults(value: any) {

    this.calculateFormDto = this.calculateForm.value;
    this.calculateResultsDto = this.submitForm.value;

    if(this.showMore && this.areValuesBlank()) {

      this.calculatorService
        .getDetailedFormCalculationResultsButton(this.getCombinedData())
        .subscribe((data: CalculateResultsDto) => {
          this.calculateResultsDto = data;
        });
    } else {
      this.calculatorService
        .getFormCalculationResultsButton(this.calculateFormDto)
        .subscribe((data: CalculateResultsDto) => {
          this.calculateResultsDto = data;
        });
    }
  }

  updateResultsMontly(value: any) {

    this.monthlyPaymentComponent.monthlyPaymentDto = this.applyForm.value;
    this.monthlyPaymentResultsDto = this.applyForm.value;

      this.monthlyPaymentService
        .getCalculationResults(value)
        .subscribe((data: MonthlyPaymentResultsDto) => {
          this.monthlyPaymentResultsDto = data;
        });
  }
  
  calculateMonthly() {
    if (this.applyForm.valid) {

      this.spinnerOn = true;


      this.monthlyPaymentComponent.monthlyPaymentDto = this.applyForm.value;
      this.monthlyPaymentResultsDto = this.applyForm.value;

      const resultsContainer = document.querySelector('.grid-container2');
      resultsContainer?.classList.add('show-results');
      const formData: MonthlyPaymentDto = this.applyForm.value;
      this.monthlyPaymentComponent.calculateResults(formData);

      this.monthlyPaymentService.getEuribor().subscribe((data) => {
        this.euriborValue = data;
        this.fixedRate = '2';
      });
      this.monthlyPaymentService
        .getTotalInterestRate(formData)
        .subscribe((data) => {
          this.totalInterestRate = data;
        });
      this.monthlyPaymentService
        .getTotalPaymentSum(formData)
        .subscribe((data) => {
          this.totalPaymenSum = data;
          this.spinnerOn = false;
        });

        this.updateResultsMontly(this.monthlyPaymentResultsDto);
    }
  }
  onUpdate(value: any) {
    if (this.calculateForm.valid) {
      this.updateResults(value);
    }
  }

  onUpdateMonthly(value: any) {
    if (this.applyForm.valid) {
      this.updateResultsMontly(value);
    }
  }

  onCalculateButton() {
    if (this.calculateForm.valid) {
      this.calculateFormDto = this.calculateForm.value;
      this.calculateResultsDto = this.submitForm.value;

      this.spinnerOn = true;
      this.calculatorService
        .getFormCalculationResultsButton(this.calculateFormDto)
        .subscribe((data: CalculateResultsDto) => {
          this.calculateResultsDto = data;
          this.spinnerOn = false;
        });

      this.actionText = 'Calculated';
      this.showColumn2 = true;
      this.actionText = 'Submitted form';
    }
  }

  handleButtonClick() {
    if (this.calculateForm.valid) {
      if (this.showMore && this.areValuesBlank()) {
        console.log(this.areValuesBlank());
        this.onDetailedCalculateButton();
      } else {
          this.onCalculateButton();        
      }
    }
  }

  onDetailedCalculateButton() {
    if (this.calculateForm.valid) {
      this.calculateFormDto = this.calculateForm.value;
      this.calculateResultsDto = this.submitForm.value;

      this.spinnerOn = true;
      this.calculatorService
        .getDetailedFormCalculationResultsButton(this.getCombinedData())
        .subscribe((data: CalculateResultsDto) => {
          this.calculateResultsDto = data;
          this.spinnerOn = false;
        });

      this.actionText = 'Calculated';
      this.showColumn2 = true;
      this.actionText = 'Submitted form';
    }
  }

  onSubmit() {
    if (this.calculateForm.valid) {
      this.calculateFormDto = this.calculateForm.value;
      this.calculateResultsDto = this.submitForm.value;

      if (this.showMore && this.areValuesBlank()) {
        this.calculatorService
          .sendDataDetailed(this.getCombinedData())
          .subscribe((data: CalculateResultsDto) => {
            this.calculateResultsDto = data;
          });
      } else {
        this.calculatorService
          .sendData(this.calculateFormDto)
          .subscribe((data: CalculateResultsDto) => {
            this.calculateResultsDto = data;
          });
      }
      this.updateResults(this.calculateFormDto);
    }
  }

  areValuesBlank(): boolean {
    const fieldsToCheck = [
      'city',
      'buyOption',
      'studentLoan',
      'otherLoan',
      'politicalyExposed',
    ];
    
    return fieldsToCheck.some(
      (fieldName) => !this.isBlank(this.calculateForm.get(fieldName)?.value));
  }
  
  isBlank(value: any): boolean {
    return value === '' || value === undefined || value === null;
  }

  getCombinedData(): CalculateFormDto {
    return {
      homePrice: this.calculateForm.value.homePrice,
      monthlyFamilyIncome: this.calculateForm.value.monthlyFamilyIncome,
      loanTerm: this.calculateForm.value.loanTerm,
      familyMembers: this.calculateForm.value.familyMembers,
      haveChildren: this.calculateForm.value.haveChildren,
      detailedFormDto: {
        city: this.calculateForm.value.citySelect,
        buyOption: this.calculateForm.value.buyOption,
        studentLoan: this.calculateForm.value.studentLoan,
        otherLoan: this.calculateForm.value.otherLoan,
        politicalyExposed: this.calculateForm.value.politicalyExposed,
      },
    };
  }

  handleResultsCalculated(results: MonthlyPaymentResultsDto): void {
    this.monthlyPaymentResultsDto.estimatedMonthlyPayment =
      results.estimatedMonthlyPayment;
    this.monthlyPaymentResultsDto.maxMonthlyPayment = results.maxMonthlyPayment;
  }

  onChange() {}
  showAdvancedOptions = false;
  showPopup = false;

  showPopupForm() {
    this.showPopup = true;
  }
}
