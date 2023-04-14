import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../types';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements AfterViewInit {

  customers: MatTableDataSource<Customer> = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['name', 'phoneNumber', 'email', 'ip', 'time'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: CustomerService) {}

  ngAfterViewInit() {
    this.service.getCustomer().subscribe((data) => {
      this.customers.data = data;
      this.customers.paginator = this.paginator;
    });
  }






}




export interface PeriodicElement {
  name: string;
  number: number;
  email: string;
  ip: number;
  time: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { number: 1, name: 'Hydrogen', ip: 1.0079, email: 'H', time: 1120 },
  { number: 2, name: 'Helium', ip: 4.0026, email: 'He', time: 1120 },
  { number: 3, name: 'Lithium', ip: 6.941, email: 'Li', time: 1120 },
  { number: 4, name: 'Beryllium', ip: 9.0122, email: 'Be', time: 1120 },
  { number: 5, name: 'Boron', ip: 10.811, email: 'B', time: 1120 },
  { number: 6, name: 'Carbon', ip: 12.0107, email: 'C', time: 1120 },
  { number: 7, name: 'Nitrogen', ip: 14.0067, email: 'N', time: 1120 },
  { number: 8, name: 'Oxygen', ip: 15.9994, email: 'O', time: 1120 },
  { number: 9, name: 'Fluorine', ip: 18.9984, email: 'F', time: 1120 },
  { number: 10, name: 'Neon', ip: 20.1797, email: 'Ne', time: 1120 },
  { number: 11, name: 'Sodium', ip: 22.9897, email: 'Na', time: 1120 },
  { number: 12, name: 'Magnesium', ip: 24.305, email: 'Mg', time: 1120 },
  { number: 13, name: 'Aluminum', ip: 26.9815, email: 'Al', time: 1120 },
  { number: 14, name: 'Silicon', ip: 28.0855, email: 'Si', time: 1120 },
  { number: 15, name: 'Phosphorus', ip: 30.9738, email: 'P', time: 1120 },
  { number: 16, name: 'Sulfur', ip: 32.065, email: 'S', time: 1120 },
  { number: 17, name: 'Chlorine', ip: 35.453, email: 'Cl', time: 1120 },
  { number: 18, name: 'Argon', ip: 39.948, email: 'Ar', time: 1120 },
  { number: 19, name: 'Potassium', ip: 39.0983, email: 'K', time: 1120 },
  { number: 20, name: 'Calcium', ip: 40.078, email: 'Ca', time: 1120 },
];
