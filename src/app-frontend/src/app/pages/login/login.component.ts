import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from "@angular/material/snack-bar";

import { User } from '../../models/user.model';
import { Response } from '../../models/response.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  user = new User()

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //clean secret_token
    localStorage.removeItem("secret_token");
  }


  login() {

    if (this.loginForm.valid) {

      this.user.email = this.loginForm.value['email']
      this.user.password = this.loginForm.value['password']

      this.loginService.login(this.user).subscribe((response: Response) => {

        if (response.status) {
          localStorage.setItem('secret_token', response.result.token) // get token
          this.router.navigate(['/customers']);
        }
        else {
          this.snackBar.open(response.message, 'OK');
        }

      }, (error: any) => {
        this.snackBar.open(error, 'OK');
      });
    } else {
      this.snackBar.open('Check your credentials format.', 'OK');
    }

  }

}
