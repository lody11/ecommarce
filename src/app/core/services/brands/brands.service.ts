import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }

  getAllBrands():Observable<any>{
    return this.httpClient.get(`${baseUrl.BaseUrl}/brands`);
  }
  
}
