import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { Cart } from '../../../shared/interface/cart/cart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  cartList: Cart[] = [];
  cartId!: string;


  constructor(private cart: CartService) {}
  getCart() {
    this.cart.getProductToCart().subscribe({
      next: (res) => {
        console.log(res);
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this.cartId = res.cartId;
        this.cart.cartNumber.set(res.numOfCartItems)
      },
    });
  }

  updateCart(productId: string, count: number) {
    this.cart.updateProductToCart(productId, count).subscribe({
      next: (res) => {
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this.cart.cartNumber.set(res.numOfCartItems)
      },
    });
  }

  removeSpacificProduct(productId: string) {
    this.cart.removeProduct(productId).subscribe({
      next: (res) => {
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products;
        this.cart.cartNumber.set(res.numOfCartItems)
      },
    });
  }

  clearAllProduct() {
    this.cart.clearCart().subscribe({
      next: (res) => {
        this.getCart();
      },
    });
  }

  ngOnInit(): void {
    this.getCart();
  }
}
