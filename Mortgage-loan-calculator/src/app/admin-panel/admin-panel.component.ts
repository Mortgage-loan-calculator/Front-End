import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from './services/customer.service';
import { Customer } from '../types';
import { CalculatorFormComponent } from '../calculator-form/calculator-form.component';
import {StorageService} from "../admin-login/services/storage.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminPanelComponent implements AfterViewInit, OnInit {

  columnsToDisplay = ['name', 'phoneNumber', 'email', 'time', 'action'];
  expandedCustomer: Customer | undefined;
  constructor (private service: CustomerService) {
  }
  ngOnInit(){

  }

  customers: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();

  displayedColumns: string[] = [
    'name',
    'phoneNumber',
    'email',
    'ip',
    'time',
    'action',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(CalculatorFormComponent)
  calculatorFormComponent?: CalculatorFormComponent;
  ngAfterViewInit() {
    this.service.getCustomer().subscribe((data) => {
      this.customers.data = data;
      this.customers.paginator = this.paginator;
    });
  }
  deleteCustomer(id: string): void{
    this.service.deleteCustomer(id);
    location.reload();
}

}
