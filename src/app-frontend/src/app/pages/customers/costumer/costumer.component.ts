import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from '@angular/router';

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
    private subscriptionsService: SubscriptionsService,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.customer.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getAllSubscriptions()

    if (this.customer.id) {
      this.getById(this.customer.id)
    }

  }

  save() {

    this.customer.subscriptions = this.subscriptions.filter(function (value) {
      return value.checked == true;
    }).map((subscription: Subscription) => {
      return subscription.id;
    });

    if (this.customer.id) {
      this.update(this.customer)
    }else{
      this.create(this.customer)
    }
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

  update(customer: Customer) {
    this.customersService.update(customer).subscribe(response => {

      this.snackBar.open(response.message, 'OK');
      if (response.status) {
        this.router.navigate(['/customers']);
      }

    }, error => {
      this.snackBar.open(error, 'OK');
    });
  }

  getById(id: number) {
    this.customersService.getById(id).subscribe(response => {

      if (response.status) {
        this.customer = response.result;

        //logic to check as true the subscriptions selected
        for (let i = 0; i < this.customer.mysubscriptions.length; i++) {
          for (let j = 0; j < this.subscriptions.length; j++) {
            if (this.customer.mysubscriptions[i].id == this.subscriptions[j].id) {
              this.subscriptions[j].checked = true;
              break;
            }
          }
        }

      }
      else {
        this.snackBar.open(response.message, 'OK');
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
