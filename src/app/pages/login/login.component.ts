import { Component } from '@angular/core';
import { AuthenRequest } from "../../../models/authen-request";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/models/BaseResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username: string | undefined;
  public password: string | undefined;
  public loginWarning: string | null | undefined;
  authenResponse: BaseResponse<any> | null | undefined;  // Sử dụng BaseResponse với kiểu `any`
  public authenticateUrl: string = environment.apiUrl + "/v1/authen/login";
  loginwarning: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  public onSubmit() {
    const authen: AuthenRequest = new AuthenRequest(this.username, this.password);
    console.log(authen);
    
    // Sử dụng BaseResponse trực tiếp với kiểu `any` cho dữ liệu trả về
    this.http.post<BaseResponse<any>>(this.authenticateUrl, authen).subscribe((res: BaseResponse<any>) => {
      console.log(res);
      this.authenResponse = res;  // Lưu kết quả vào authenResponse

      if (res.code === '200') {
        this.router.navigate(['home']);
        if (typeof this.username === "string") {
          localStorage.setItem('username', this.username);
        }
      } else {
        this.loginwarning = 'Authentication failed, Please try again';
        this.router.navigate(['login']);
      }
    });
  }
}
