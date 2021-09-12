import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";

import { Customer } from '../../models/customer.model'
import { Response } from '../../models/response.model'

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiRoot: string = environment.api + 'customers';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.get(apiRoot).pipe(map(res => {

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

        return customer;
      });

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

}
