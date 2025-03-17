import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private HttpClient:HttpClient) { }

  getAllCategory():Observable<any> {
    return this.HttpClient.get(`${baseUrl.BaseUrl}/categories`);
  }
}
