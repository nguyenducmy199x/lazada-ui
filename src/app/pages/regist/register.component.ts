import { Component } from '@angular/core';
import {AuthenResponse} from "../../../models/authen-response";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenRequest} from "../../../models/authen-request";

import {Account} from "../../../models/account";
import {BaseResponse} from "../../../models/BaseResponse";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public username: string | undefined;
  public password: string | undefined;
  public email: string | undefined;
  public loginWarning: string | null | undefined;
  authenResponse: AuthenResponse | null | undefined;
  public registerUrl: string =  environment.apiUrl + "/v1/authen/new-account";
  loginwarning: string | undefined;

  constructor(private http: HttpClient, private router: Router) {
  }



  public onSubmit() {

    const register: Account = new Account(this.username, this.password, this.email);

    // @ts-ignore
    this.http.post<BaseResponse<Account>>(this.registerUrl, register).subscribe({
      next: (res) => {
        console.log('Kết quả:', res);
        this.router.navigate(['login'])
      },
      error: (error) => {
        console.error('Lỗi:', error);
      }
    });

  }
}
