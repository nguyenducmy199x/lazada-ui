import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../models/register-request';
import { BaseResponse } from '../../models/base-response';
import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ]
})
export class RegisterComponent  implements OnInit {
  public username: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
  public retypePassword: string | undefined;
  public response: string | null | undefined;
  public loginwarning: string | null | undefined;
  public registerUrl: string =  environment.apiUrl + "/v1/authen/register";

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {
  }


  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.password !== this.retypePassword) {
      this.loginwarning = 'Retype password does not match password.';
      return;
    }

    const register: RegisterRequest = new RegisterRequest(this.username, this.password, this.email);
    // @ts-ignore
    this.http.post<BaseResponse<any>>(this.registerUrl, register).subscribe((res: BaseResponse<any>) => {
      
      if (res.code === '200') {
        this.alertService.show('Register successfully!', 'success');
        this.router.navigate(['login']);
      }else{
        this.alertService.show('Register failed! ' + res.data, 'error');
        this.router.navigate(['register'])
      }
    });
  }
}
