import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { Cart } from '../../../shared/interface/cart/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  imports: [RouterLink],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  allOrders!: number
  orders: Cart[]=[]

  private readonly _orderService=inject(OrdersService)
  ngOnInit(): void {
    this.getCardData();
  }

  getCardData(){
    this._orderService.getAllOrders().subscribe({
      next:(res)=>{
        this.allOrders = res.results
        this.orders = res.data;
      }
    }
    )
  }
}
