import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";

import { Customer } from '../../models/customer.model'
import { Subscription } from '../../models/subscription.model'
import { Response } from '../../models/response.model'

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiRoot: string = environment.api + 'customers/';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.get(apiRoot, this.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result.map((record: any) => {

        let customer = new Customer();
        customer.id = record.id;
        customer.name = record.name;
        customer.email = record.email;
        customer.phone = record.phone;
        customer.state = record.state;
        customer.city = record.city;
        customer.birthdate = record.birthdate;

        //set subcriptions
        customer.mysubscriptions = record.subscriptions?.map((record: Subscription) => {
          let subcription = new Subscription();
          subcription.id = record.id;
          subcription.name = record.name;
          subcription.price = record.price;
          return subcription;
        });

        return customer;
      });

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  getById(id: number): Observable<Response> {

    let apiRoot = this.apiRoot + id;

    return this.http.get(apiRoot, this.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {

        let customer = new Customer();
        customer.id = resultRAW.result?.id;
        customer.name = resultRAW.result?.name;
        customer.email = resultRAW.result?.email;
        customer.phone = resultRAW.result?.phone;
        customer.state = resultRAW.result?.state;
        customer.city = resultRAW.result?.city;
        customer.birthdate = resultRAW.result?.birthdate;

        //set subcriptions
        customer.mysubscriptions = resultRAW.result?.subscriptions?.map((record: Subscription) => {
          let subcription = new Subscription();
          subcription.id = record.id;
          subcription.name = record.name;
          subcription.price = record.price;
          return subcription;
        });

        response.result = customer;

      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  create(customer: Customer): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.post(apiRoot, customer, this.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  update(customer: Customer): Observable<Response> {

    let apiRoot = this.apiRoot + customer.id;

    return this.http.put(apiRoot, customer, this.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      //response.result = resultRAW.result;

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

  delete(id: number): Observable<Response> {

    let apiRoot = this.apiRoot + id;

    return this.http.delete(apiRoot, this.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;
      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }






  // this function must be in an "util" file, I wrote it here to do it fast.
  public getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('secret_token')
      })
    };
  }

}
