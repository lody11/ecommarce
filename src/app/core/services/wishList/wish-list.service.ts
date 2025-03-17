import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private http: HttpClient) { }


  addProductToWish(productId:string):Observable<any>{
    return  this.http.post(`${baseUrl.BaseUrl}/wishlist`,
      {productId:productId}
    )
  }


  getProductToWish():Observable<any>{
    return this.http.get(`${baseUrl.BaseUrl}/wishlist`)
  }

removeWish(productId:string):Observable<any>{
  return this.http.delete(`${baseUrl.BaseUrl}/wishlist/${productId}`)
}

addProductToWishList(id:string):void{
  this.addProductToWish(id).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
