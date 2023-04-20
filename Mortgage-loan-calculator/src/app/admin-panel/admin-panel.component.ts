import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from './services/customer.service';
import { Customer } from '../types';
import { CalculatorFormComponent } from '../calculator-form/calculator-form.component';
import {StorageService} from "../admin-login/services/storage.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements AfterViewInit, OnInit {
  isLoggedIn = false;


  constructor (private service: CustomerService, private storageService: StorageService) {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(!this.isLoggedIn || !this.storageService.getUser().roles.includes('ROLE_ADMIN')){
      window.location.href = '/adminlogin';
    }
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

}
