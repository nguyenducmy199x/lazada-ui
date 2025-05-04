import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenResponse } from '../../models/authen-response';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Authen } from '../../models/authen';

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
  authenResponse: AuthenResponse | null | undefined;
  public authenticateUrl: string =  environment.apiUrl + "/v1/authen/login";

  constructor(private http: HttpClient, private router: Router) {
  }


  ngOnInit(): void {
  }

  public onSubmit() {
    const authen: Authen = new Authen(this.username, this.password);
    // @ts-ignore
    this.http.post<BaseResponse<any>>(this.authenticateUrl, authen).subscribe((res: BaseResponse<any>) => {
      
      sessionStorage.setItem('access_token', res.data);
      if (res.code === '200') {
        this.username ? sessionStorage.setItem('username', this.username) : null;
        if(this.username === 'admin'){
          this.router.navigate(['add-product']);
          return; 
        }
        this.router.navigate(['home']);

      }else{
        this.router.navigate(['login'])
        this.loginwarning = 'Login Failed , Please try again';
      }
    });
  }
}
