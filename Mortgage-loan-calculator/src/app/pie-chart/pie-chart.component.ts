import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  @ViewChild('chartCanvas') chartCanvas?: ElementRef;

  public chart: any;
  ngOnInit(): void {
    this.createChart();
  }

  constructor() {}

  animateChart() {
    if (this.chart) {
      this.chart.options.animation = {
        onComplete: () => {
          this.chart.options.animation = false;
        },
      };
      this.chart.update();
    }
  }
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'pie',

      data: {
        labels: ['Loan Amount', 'Total interest paid', 'Agreement fee'],
        datasets: [
          {
            label: 'Money',
            data: [300, 240, 100],
            backgroundColor: ['blue', 'red', 'green'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        // responsive: false,
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
