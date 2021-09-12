import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';

import { CustomersService } from './../customers.service';

import { Customer } from './../../../models/customer.model'


@Component({
  selector: 'app-costumer',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.css']
})
export class CostumerComponent implements OnInit {

  customer = new Customer();

  constructor(private customersService: CustomersService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  save(){
    this.create(this.customer)
  }


  create(customer: Customer) {
    this.customersService.create(customer).subscribe(response => {

      this.snackBar.open(response.message, 'OK');
      if (response.status) {
        this.router.navigate(['/customers']);
      }


    }, error => {
      this.snackBar.open(error, 'OK');
    });
  }

}
