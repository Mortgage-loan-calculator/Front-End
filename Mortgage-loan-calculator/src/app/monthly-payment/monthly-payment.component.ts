import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MonthlyPaymentService } from './service/monthly-payment.service';
import { MonthlyPaymentDto, MonthlyPaymentResultsDto } from './monthly-payment-dto';

const fb = new FormBuilder().nonNullable;

@Component({
  selector: 'app-monthly-payment',
  templateUrl: './monthly-payment.component.html',
  styleUrls: ['./monthly-payment.component.css']
})
export class MonthlyPaymentComponent {

  monthlyPaymentDto: MonthlyPaymentDto = {} as MonthlyPaymentDto;
  @Input() monthlyPaymentResultsDto: MonthlyPaymentResultsDto = {} as MonthlyPaymentResultsDto;
  @Output() onResultsCalculated = new EventEmitter<MonthlyPaymentResultsDto>();


  constructor(private monthlyPaymentService: MonthlyPaymentService) {}

  calculateResults(monthlyPaymentDto: MonthlyPaymentDto): void {
      this.monthlyPaymentService
      .getCalculationResults(monthlyPaymentDto)
      .subscribe((data: MonthlyPaymentResultsDto) => {
        this.monthlyPaymentResultsDto = data;

        this.onResultsCalculated.emit({
          estimatedMonthlyPayment: this.monthlyPaymentResultsDto.estimatedMonthlyPayment,
          maxMonthlyPayment: this.monthlyPaymentResultsDto.maxMonthlyPayment,
        });
      });
  }
}
