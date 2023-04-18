import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  @ViewChild('chartCanvas') chartCanvas?: ElementRef;

  private _loanAmount: number = 2;
  private _intrestPaid: number = 3;
  private _agreementFee: number = 1;

  public chart: any;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart) {
      this.updateChart();
    }
  }

  @Input() set loanAmount(value: number) {
    this._loanAmount = value;
    this.updateChart();
  }

  get loanAmount(): number {
    return this._loanAmount;
  }

  @Input() set intrestPaid(value: number) {
    this._intrestPaid = value;
    this.updateChart();
  }

  get intrestPaid(): number {
    return this._intrestPaid;
  }

  @Input() set agreementFee(value: number) {
    this._agreementFee = value;
    this.updateChart();
  }

  get agreementFee(): number {
    return this._agreementFee;
  }

  updateChart() {
    this.chart.data.datasets[0].data = [
      this._loanAmount,
      this._intrestPaid,
      this._agreementFee,
    ];
    this.chart.update();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'pie',
      data: {
        labels: ['Loan Amount', 'Total interest paid', 'Agreement fee'],
        datasets: [
          {
            label: 'Money',
            data: [this._loanAmount, this._intrestPaid, this._agreementFee],
            backgroundColor: ['blue', 'red', 'green'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2,
        plugins: {
          legend: {
            display: false,
          },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
        },
      },
    });
  }
}
