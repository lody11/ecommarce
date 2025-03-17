import { Component, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../../core/services/brands/brands.service';
import { Brands } from '../../../shared/interface/brands/brands';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-brands',
  imports: [UpperCasePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  brandList: WritableSignal<Brands[]> = signal([]);

  constructor(private brand: BrandsService) {}

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands() {
    this.brand.getAllBrands().subscribe({
      next: (res) => {
        this.brandList.set(res.data);
      },
    });
  }
}
