import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';

import { CustomersService } from './../customers.service';
import { SubscriptionsService } from './../../subscriptions/subscriptions.service';

import { Customer } from './../../../models/customer.model'
import { Subscription } from './../../../models/subscription.model'

@Component({
  selector: 'app-costumer',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.css']
})
export class CostumerComponent implements OnInit {

  customer = new Customer();
  subscriptions: Array<Subscription> = [];

  constructor(private customersService: CustomersService,
    private snackBar: MatSnackBar,
    private router: Router,
    private subscriptionsService: SubscriptionsService) { }

  ngOnInit(): void {
    this.getAllSubscriptions()
  }

  save() {

    this.customer.subscriptions = this.subscriptions.filter(function (value) {
      return value.checked == true;
    }).map((subscription: Subscription) => {
      return subscription.id;
    });

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

  getAllSubscriptions() {
    this.subscriptionsService.getAll().subscribe(response => {

      if (response.status) {
        this.subscriptions = response.result;
      } else {
        this.snackBar.open(response.message, 'OK');
      }
    }, error => {
      this.snackBar.open(error, 'OK');
    });
  }

}
