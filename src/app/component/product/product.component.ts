import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {calendar} from "../../../../vendors/moment/moment";
import {Product} from "../../../models/product";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {PageProductRequest} from "../../../models/page-product-request";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  category: string | undefined;
  image: File | undefined;
  public imageShow: any;
  price: string | undefined;
  products: Product[] | undefined;
  pageSize: number[] | undefined;
  pageOnClick: string | undefined;
  currentState: any | undefined;
  pageId: string | undefined;
  private readonly imageType: string = 'data:image/PNG;base64,';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  electronicDeviceProductsUrl: string = environment.apiUrl + "/v1/product/get-products-by-category";
  pagingationUrl: string = environment.apiUrl + "/v1/product/get-product-by-title-and-by-paging-number";

  private product: Product | undefined;

  choosePage(i:any){
    this.products = [];
    console.log(i)
    alert(i);

    this.pageOnClick = i.toString();
    alert("set by click")
    console.log(this.pageOnClick)
    alert(this.pageOnClick)
    // @ts-ignore
    this.getPageProducts(this.pageOnClick);

    // @ts-ignore
    localStorage.setItem("pageOnClick", this.pageOnClick);
  }


  ngOnInit(): void {
    let isNotYetClick = "0";
    localStorage.getItem("pageOnClick");
    if(localStorage.getItem("pageOnClick") != undefined){
      // @ts-ignore
      this.getPageProducts(localStorage.getItem("pageOnClick"));
    }else{
      console.log("init method");
      console.log(isNotYetClick)
      this.getPageProducts(isNotYetClick);
    }

  }
  getPageProducts(pageOnClick: string){
    const categoryRequest = "Electronics Device";
    const httpOptions = {
      headers: new HttpHeaders({'content-type': 'application/json'})
    }

    // pagingation
    const pageProductRequest = new PageProductRequest(pageOnClick, "Electronics Device");
    // @ts-ignore
    this.http.post(this.pagingationUrl, pageProductRequest, httpOptions).subscribe((res: Product[]) => {
      var list = new Array();
      for (var i = 0; i < res.length; i++) {
        this.imageShow = this.sanitizer.bypassSecurityTrustUrl(this.imageType + res[i].image);
        // console.log(res[i].image);

        // @ts-ignore
        this.product = new Product(res[i].category, res[i].title, res[i].price, res[i].describe, this.imageShow);
        // console.log(this.product);
        list.push(this.product);
      }
      this.products = list;
      console.log(this.products)
      this.pageSize = Array.from(Array(this.products.length).keys());
      console.log(this.pageSize)
    });
  }
}
