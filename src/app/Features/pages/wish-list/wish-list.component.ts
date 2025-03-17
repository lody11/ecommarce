import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishListService } from '../../../core/services/wishList/wish-list.service';
import { Products } from '../../../shared/interface/products/products';

@Component({
  selector: 'app-wish-list',
  imports: [RouterLink,  CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{

  wishList:Products[] = [];
  wishCount:number = 0

  constructor(private _wishList:WishListService,
    private cart:CartService,
    private toastr:ToastrService
  ){}

ngOnInit(): void {
  this.getAllWish()
}

getAllWish():void{
  this._wishList.getProductToWish().subscribe({
    next:(res)=>{
      console.log(res)
      this.wishList = res.data
      this.wishCount = res.count
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

addProduct(productId:string){
  this.cart.addProductToCart(productId).subscribe({
    next:(res)=>{
      console.log(res)
      this.cart.cartNumber.set(res.numOfCartItems)
      this.toastr.success(res.message,'success',{
        closeButton:true,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    }
  })
}


// check if product id in wishList
getUserWishList():void{
  
  this._wishList.getProductToWish().subscribe({
    next:(res)=>{
      this.wishList = res.data
    }, 
  })

}

checkifProductInWish(id:string):boolean{
  let res:boolean = false
  this.wishList.forEach(element => {
    if(element._id === id)
      res=true
   
  });
  return res;
}


// add product to wish list
// addProductToWish(id:string):void{

//   this._wishList.addProductToWishList(id)
 
// }
  
// remove from wishlist
removeFromWish(id:string):void{
  this._wishList.removeWish(id).subscribe({
    next:(res)=>{
      // refresh the wished product
      this.getAllWish()
    this.toastr.success(res.message,'success')
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

}
