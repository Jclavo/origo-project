import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";

import { User } from '../../models/user.model'
import { Response } from '../../models/response.model'

import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,) { }

  login(user: User): Observable<unknown> {

    let apiRoot = environment.api + 'login';

    return this.http.post(apiRoot, user).pipe(map(res => {

      let response = new Response();
      let resultRAW: any = res;

      response.status = resultRAW.status;
      response.message = resultRAW.message;

      if (resultRAW.result) {
        let user = new User();

        user.id = resultRAW.result?.id;
        user.email = resultRAW.result?.name;
        user.token = resultRAW.result?.token;

        response.result = user;
      }

      return response;

    }),
      catchError(error => {
        return throwError(error.message);
      }));
  }
}
