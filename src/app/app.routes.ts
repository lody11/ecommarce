import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Features/layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './Features/layout/main-layout/main-layout.component';
import { authGuard } from './core/guard/auth/auth.guard';
import { checkTokenGuard } from './core/guard/checkToken/check-token.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [checkTokenGuard],
    children: [
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import('./Features/auth/login/login.component').then(
                (c) => c.LoginComponent
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('./Features/auth/register/register.component').then(
                (c) => c.RegisterComponent
              ),
          },
          {
            path: 'resetPassword',
            loadComponent: () =>
              import(
                './Features/auth/reset-password/reset-password.component'
              ).then((c) => c.ResetPasswordComponent),
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./Features/pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'productDetails/:id',
        loadComponent: () =>
          import(
            './Features/pages/product-details/product-details.component'
          ).then((c) => c.ProductDetailsComponent),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./Features/pages/cart/cart.component').then(
            (c) => c.CartComponent
          ),
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./Features/pages/allOrders/all-orders.component').then(
            (c) => c.AllOrdersComponent
          ),
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./Features/pages/checkOut/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./Features/pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./Features/pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./Features/pages/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./Features/pages/wish-list/wish-list.component').then(
            (c) => c.WishListComponent
          ),
      },
    ],
  },
];
