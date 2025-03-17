import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private HttpClient: HttpClient) {}

  checkout(id: string, data: object): Observable<any> {
    return this.HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      data
    );
  }

  getAllOrders(): Observable<any> {
    return this.HttpClient.get(`${baseUrl.BaseUrl}/orders`);
  }
}
