import { Component, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { FilterPipe } from "../../../shared/pipe/filter.pipe";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../core/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, UpperCasePipe, FilterPipe, FormsModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  searchValue: string = '';
  productList:WritableSignal<Products[]>= signal([]);
  wishList:Products[] = []  

  constructor(private product: ProductsService,private cart:CartService,
    private _wishList:WishListService,private toaster:ToastrService) {}



  ngOnInit(): void {
    this.getAllProducts();
    this.getUserWishList()
  }

  getAllProducts() {
    this.product.getProducts().subscribe({
      next: (res) => {
        this.productList.set(res.data);
      },
    });
  }

  addProduct(productId:string){
    this.cart.addProductToCart(productId).subscribe({
      next:(res)=>{
        this.cart.cartNumber.set(res.numOfCartItems)
        this.toaster.success(res.message,"success",{
          timeOut:1000,
          progressBar:true
        })
      }
    })
  }

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
  addProductToWish(id:string):void{
 
    this._wishList.addProductToWishList(id)
    this.toaster.success("Product added to wish list","success",{timeOut:1000,progressBar:true})
    setTimeout(() => {
      this.getUserWishList()
    },1000)
    
  }
}
