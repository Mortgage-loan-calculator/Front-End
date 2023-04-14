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
  displayedColumns: string[] = ['name', 'phoneNumber', 'email', 'ip', 'time', 'action'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: CustomerService) {}

  ngAfterViewInit() {
    this.service.getCustomer().subscribe((data) => {
      this.customers.data = data;
      this.customers.paginator = this.paginator;
    });
  }

}
