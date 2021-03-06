import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";

import { UtilsService } from '../../helpers/utils.service'
import { Subscription } from '../../models/subscription.model'
import { Response } from '../../models/response.model'

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  private apiRoot: string = environment.api + 'subscriptions/';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  getAll(): Observable<Response> {

    let apiRoot = this.apiRoot;

    return this.http.get(apiRoot, this.utilsService.getHeaders()).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      //Set response
      response.status = resultRAW.status;
      response.message = resultRAW.message;

      response.result = resultRAW.result.map((record: any) => {

        let subscription = new Subscription();
        subscription.id = record.id;
        subscription.name = record.name;
        subscription.price = record.email;
        return subscription;
      });

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }

}
