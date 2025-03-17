import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private HttpClient:HttpClient) { }

  getProducts():Observable<any>{
    return this.HttpClient.get(`${baseUrl.BaseUrl}/products`);
  }
  getSpacificProduct(id:string):Observable<any>{
    return this.HttpClient.get(`${baseUrl.BaseUrl}/products/${id}`);
  }
}
