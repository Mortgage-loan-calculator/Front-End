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
        const isDateMatch = date.toDateString() === filterDate.toDateString();
        const isPhoneNumberMatch = data.phoneNumber.includes(filter); // Add this line to check phone number

        return isNameMatch || isDateMatch || isPhoneNumberMatch;
      };
    });
  }
  noResultsFound = false;

  searchCustomers(query: string): void {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) {
      this.customers.filter = '';
      this.noResultsFound = false;
      return;
    }
    const filteredCustomers = this.customers.data.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm) ||
      `${customer.phoneNumber}`.includes(searchTerm)||
      customer.email.toLowerCase().includes(searchTerm)
    );
    console.log(filteredCustomers);
    this.customers.filter = searchTerm;
    this.noResultsFound = filteredCustomers.length === 0;
  }


  searchByDate(date: Date | null) {
    if (date) {
      this.customers.filter = date.toDateString();
    } else {
      this.customers.filter = '';
    }
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
