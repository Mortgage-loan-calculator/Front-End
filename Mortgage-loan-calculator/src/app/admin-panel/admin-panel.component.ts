import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../types';
import { CalculatorFormComponent } from '../calculator-form/calculator-form.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements AfterViewInit, OnInit {
  customers: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  displayedColumns: string[] = [
    'name',
    'number',
    'email',
    'ip',
    'time',
    'action',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(CalculatorFormComponent)
  calculatorFormComponent?: CalculatorFormComponent;

  constructor(private service: CustomerService) {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.service.getCustomer().subscribe((data) => {
      this.customers.data = data;
      this.customers.paginator = this.paginator;
    });
  }
}
