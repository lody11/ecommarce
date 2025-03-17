import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../shared/interface/products/products';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  id: any;
  productDetails!: Products;
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductsService,
    private cart:CartService,
    private toaster:ToastrService
  ) {
    activatedRoute.params.subscribe((res) => {
      console.log(res['id']);
      this.id = res['id'];
    });
  }
  ngOnInit(): void {
    this.getSpasificProduct();
  }
  getSpasificProduct() {
    this.product.getSpacificProduct(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
    });
  }
  addProduct(productId:string){
    console.log(productId);
    this.cart.addProductToCart(productId).subscribe({
      next:(res)=>{
        console.log(res);
        this.toaster.success(res.message,"success",{
          timeOut:1000,
          progressBar:true,
        })
      }
    })
  }
}
