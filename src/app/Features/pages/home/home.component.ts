import { Component } from '@angular/core';
import { ProductsComponent } from "../products/products.component";
import { HomeSliderComponent } from "../home-slider/home-slider.component";
import { CategorySliderComponent } from "../category-slider/category-slider.component";
import { FooterLayoutComponent } from "../../layout/footer/footer-layout.component";

@Component({
  selector: 'app-home',
  imports: [ProductsComponent, HomeSliderComponent, CategorySliderComponent, FooterLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
