import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
public chart: any;
ngOnInit(): void {
    this.createChart();
  }
createChart(){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Loan Amount' , "Total interest paid","Agreement fee", ],
	       datasets: [{
    label: 'Money',
    data: [300, 240, 100],
    backgroundColor: [
      'blue',
      'red',
      'green',
						
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2
      }

    });
  }
}
