import { Component, OnInit } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

import { Customer } from '../../models/customer.model'
import { Response } from '../../models/response.model'

import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers : Array<Customer> = [];
  // dataSource: MatTableDataSource<Customer> = new MatTableDataSource(this.customers);
  displayedColumns = ['name', 'email', 'phone', 'state', 'city', 'birthdate', 'subscriptions', 'options'];

  dataSource: MatTableDataSource<Customer>;
  constructor(private customersService: CustomersService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.customersService.getAll().subscribe(response => {

      if (response.status) {
        this.customers = response.result;
        console.log(this.customers)
        this.dataSource = new MatTableDataSource(this.customers);
        
      } else {
        console.log(response.message);
      }
    }, error => {
      
      this.router.navigate(['/']);
    });
  }

}
