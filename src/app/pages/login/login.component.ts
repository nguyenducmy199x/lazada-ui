import { Component } from '@angular/core';
import {AuthenResponse} from "../../../models/authen-response";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenRequest} from "../../../models/authen-request";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string | undefined;
  public password: string | undefined;
  public loginWarning: string | null | undefined;
  authenResponse: AuthenResponse | null | undefined;
  public authenticateUrl: string =   environment.apiUrl + "/v1/authen/login";
  loginwarning: string | undefined;

  constructor(private http: HttpClient, private router: Router) {
  }



  public onSubmit() {

    const authen: AuthenRequest = new AuthenRequest(this.username, this.password);
    console.log(authen)
    // @ts-ignore
    this.http.post(this.authenticateUrl, authen).subscribe((res: AuthenResponse) => {
      console.log(res);
      this.authenResponse = new AuthenResponse(res);
      if(res.code === '200'){
        this.router.navigate(['home'])
        if (typeof this.username === "string") {
          localStorage.setItem('username', this.username);
        }

      }else{
        this.loginwarning = 'Authentication failed, Please try again';
        console.log(this.loginWarning)
        this.router.navigate(['login'])
      }
    });

  }
}
