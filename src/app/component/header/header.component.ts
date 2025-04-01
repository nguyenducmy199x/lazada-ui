import {Component, OnInit} from '@angular/core';
import {ArrayType} from "@angular/compiler";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Authen} from "../../../models/authen";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchText: string |undefined;
  searchReference : string[] | undefined;
  constructor(private http : HttpClient) { }

  searchUrl = environment.apiUrl +  "/api/v1/product/search-by-product-title";
  username = localStorage.getItem('username');

  ngOnInit(): void {
  }
  onSubmit(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    console.log(this.searchText)
    // @ts-ignore
    this.http.post(this.searchUrl, this.searchText, httpOptions).subscribe((res:string[])=>{
      console.log(res);
      this.searchReference = res;
    });
  }

}
