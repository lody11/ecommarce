import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { OrdersService } from '../../../core/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  
templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  cartId!:string;
  private readonly _OrdersService=inject(OrdersService)

  constructor(private activatedRoute:ActivatedRoute, private cart:CartService) {
    activatedRoute.params.subscribe({
      next:(res)=>{
        console.log(res['id']);
        this.cartId = res['id'];
      }
    })
  }

  checkOutForm:FormGroup = new FormGroup({
    details: new FormControl(null),
    city: new FormControl(null),
    phone: new FormControl(null),
  })

  


  submitForm(){
    this._OrdersService.checkout(this.cartId,this.checkOutForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        window.location.href = res.session.url
      }
    })
  }
 
}
