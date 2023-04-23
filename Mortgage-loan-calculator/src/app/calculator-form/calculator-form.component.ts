import { LabelType, Options } from '@angular-slider/ngx-slider';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';
import { PieChartComponent } from '../pie-chart/pie-chart.component';

import { Observable, map, startWith } from 'rxjs';

import { CalculatorService } from './service/calculator.service';
import { CalculateFormDto, CalculateResultsDto } from './calculate-form-dto';

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
  private pieChart!: any;

  adultOptions: Options = {
    floor: 1,
    ceil: 5,
    translate: (value: number, label: LabelType): string => {
      if (label === LabelType.Floor) {
        return value.toString();
      } else if (value >= 5) {
        return '5+';
      } else {
        return value.toString();
      }
    },
  };

  @ViewChild(PieChartComponent) PieChartComponent!: PieChartComponent;

  title = 'json-read-example';
  citiesInfo: City[] = [];
  calculateFormDto: CalculateFormDto = {} as CalculateFormDto;
  calculateResultsDto: CalculateResultsDto = {} as CalculateResultsDto;

  myControl = new FormControl<string | City>('');
  options: City[] = [];
  filteredOptions!: Observable<City[]>;

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
  }

  displayFn(city: City): string {
    return city && city.name ? city.name : '';
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  constructor(
    private http: HttpClient,
    private calculatorService: CalculatorService
  ) {}

  loanOptions: Options = {
    floor: 1,
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
      partnerToggle: [false],

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
      citySelect: [<string | City>'', [Validators.required]],
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

  get citySelect() {
    return this.calculateForm.controls.citySelect;
  }

  actionText: string = '';

  onSubmit() {
    if (this.calculateForm.valid) {
      this.calculateFormDto = this.calculateForm.value;
      this.calculateResultsDto = this.submitForm.value;

      this.calculatorService
        .sendData(this.calculateFormDto)
        .subscribe((data: CalculateFormDto) => {
          this.calculateFormDto = data;
        });

      this.calculatorService

        .getCalculationResults(
          this.calculateFormDto.homePrice,
          this.calculateFormDto.loanTerm
        )
        .subscribe((data: CalculateResultsDto) => {
          this.calculateResultsDto = data;
        });

      this.calculatorService.saveResultData(this.calculateResultsDto);

      this.actionText = 'Calculated';
      this.showColumn2 = true;
      this.pieChart.animateChart();
      this.actionText = 'Submitted form';
      const calculateFormData = this.calculateForm.value;
    }
  }

  onChange() {}
  showAdvancedOptions = false;
  showPopup = false;

  showPopupForm() {
    this.showPopup = true;
  }
}
