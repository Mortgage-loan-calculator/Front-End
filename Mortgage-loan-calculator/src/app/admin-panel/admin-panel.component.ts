import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from './services/customer.service';
import { Customer } from '../types';
import { CalculatorFormComponent } from '../calculator-form/calculator-form.component';
import { StorageService } from '../admin-login/services/storage.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CalculateResultsDto } from '../calculator-form/calculate-form-dto';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AdminPanelComponent implements AfterViewInit, OnInit {
  spinerOn = true;
  columnsToDisplay = ['name', 'phoneNumber', 'email', 'time', 'action'];
  expandedCustomer: Customer | undefined;
  selectedDate: Date;

  constructor(private service: CustomerService) {
    this.sort = new MatSort();
    this.selectedDate = new Date();

  }

  customers: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();

  ngOnInit() {
    this.customers = new MatTableDataSource<Customer>([]);
    this.customers.sort = this.sort;
    this.service.getCustomer().subscribe((customers) => {
      const customerArray = customers;
      this.customers = new MatTableDataSource(customerArray);
      this.customers.filterPredicate = (data: Customer, filter: string) => {
        const name = data.name.toLowerCase();
        const date = new Date(data.time);
        const filterDate = new Date(filter);
        const isNameMatch = name.includes(filter);
        const isDateMatch = date.toISOString() === filterDate.toISOString();
        return isNameMatch || isDateMatch;
      };
    });
  }

  searchByDate(date: Date) {
    const filteredCustomers = this.customers.data.filter(
      (customer: Customer) => {
        const submissionDate = new Date(customer.time);
        return submissionDate.toDateString() === date.toDateString();
      }
    );
    this.customers.data = filteredCustomers;
    this.customers.paginator?.firstPage();
  }
  resetTable() {
    this.customers = new MatTableDataSource<Customer>([]);
    this.service.getCustomer().subscribe((customers) => {
      const customerArray = customers;
      this.customers = new MatTableDataSource(customerArray);
    });
  }

  searchByName(name: string) {
    this.customers.filter = name.trim().toLowerCase();
  }

  searchByNameAndDate(name: string, date: Date) {
    if (!isNaN(date.getTime())) {
      this.searchByDate(date);
    }
    if (name.trim()) {
      this.searchByName(name);
    }
  }
  // searchByDate(date: string) {
  //   if (!date) {
  //     return;
  //   }
  //   console.log('date:', date);
  //   const selectedDate = new Date(date);
  //   console.log('selectedDate:', selectedDate);
  //   if (isNaN(selectedDate.getTime())) {
  //     console.log('Invalid date value');
  //     return;
  //   }
  //   const timezoneOffsetInMs = selectedDate.getTimezoneOffset() * 60 * 1000;
  //   const localDate = new Date(selectedDate.getTime() - timezoneOffsetInMs);
  //   const filterValue = localDate.toISOString().slice(0, 10);
  //   console.log('filterValue:', filterValue);
  //   this.customers.filter = filterValue;
  //   this.customers._updateChangeSubscription();
  // }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(CalculatorFormComponent)
  calculatorFormComponent?: CalculatorFormComponent;
  length = 0;
  pageSize = 25;
  pageSizeOptions = [5, 10, 25, 100];

  ngAfterViewInit() {
    this.service.getCustomer().subscribe((data) => {
      this.customers.data = data;
      this.customers.paginator = this.paginator;
      this.length = data.length;
      this.spinerOn = false;
    });
  }
  onPageChange(event: PageEvent) {
    const pageSize = event.pageSize;
    const pageIndex = event.pageIndex;
    this.service.getCustomer().subscribe((data) => {
      this.customers.data = data;
    });
  }

  deleteCustomer(id: string): void {
    this.service.deleteCustomer(id);
    location.reload();
  }

  getCalculateFormDto(customer: Customer): void {
    this.service
      .getCalculateFormDtoById(customer.calculateForm.id)
      .subscribe((calculateFormDto) => {
        customer.calculateForm = calculateFormDto;
        this.expandedCustomer = customer;
      });
  }
}
