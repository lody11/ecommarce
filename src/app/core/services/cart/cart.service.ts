import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, count, Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseURL';
import { isPlatformBrowser } from '@angular/common';
import { Payload } from '../../../shared/interface/payload/payload';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartNumber: WritableSignal<number> = signal(0);

  constructor(private HttpClient: HttpClient) {
    this.getProductToCart().subscribe({
      next:(res)=>{
        this.cartNumber.set(res.numOfCartItems)
      }
    })
  }

  addProductToCart(productId: string): Observable<any> {
    return this.HttpClient.post(
      `${baseUrl.BaseUrl}/cart`,
      { productId: productId },
      
    );
  }
  getProductToCart(): Observable<any> {
    return this.HttpClient.get(`${baseUrl.BaseUrl}/cart`, 
      );
  }
  updateProductToCart(productId: string, count: number): Observable<any> {
    return this.HttpClient.put(
      `${baseUrl.BaseUrl}/cart/${productId}`,
      { count: count },
      
    );
  }
  removeProduct(productId: string): Observable<any> {
    return this.HttpClient.delete(`${baseUrl.BaseUrl}/cart/${productId}`,
      );
  }
  clearCart(): Observable<any> {
    return this.HttpClient.delete(`${baseUrl.BaseUrl}/cart`, 
      );
  }

  checkOut(cartId: any, payload: Payload): Observable<any> {
    return this.HttpClient.post(
      `${baseUrl.BaseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200/`,
      {
        shippingAddress: payload,
      },
      
    );
  }
}
