import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from "@angular/material/snack-bar";

import { Customer } from '../../../models/customer.model'
import { Response } from '../../../models/response.model'

import { CustomersService } from './../customers.service';
import { UtilsService } from './../../../helpers/utils.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Array<Customer> = [];
  displayedColumns = ['name', 'email', 'phone', 'state', 'city', 'birthdate', 'subscriptions', 'options'];

  dataSource: MatTableDataSource<Customer>;
  constructor(private customersService: CustomersService,
    private router: Router,
    private snackBar: MatSnackBar,
    private utilsService: UtilsService,) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.customersService.getAll().subscribe(response => {

      if (response.status) {
        this.customers = response.result;
        this.dataSource = new MatTableDataSource(this.customers);

      } else {
        this.snackBar.open(response.message, 'OK');
      }
    }, error => {
      this.snackBar.open(error, 'OK');
      this.utilsService.redirectToLogin();
    });
  }

  delete(id: number) {

    this.customersService.delete(id).subscribe(response => {

      this.snackBar.open(response.message, 'OK');
      if (response.status) {
        this.getAll();
      }
    }, error => {
      this.snackBar.open(error, 'OK');
      this.utilsService.redirectToLogin();
    });
  }

}
