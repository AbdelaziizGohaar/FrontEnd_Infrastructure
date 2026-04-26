import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products-module').then((m) => m.ProductsModule),
      },
{
  path: 'auth',
  children: [
    // {
    //   path: 'login',
    //   loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    // },
    {
      path: 'register',
      loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
    }
  ]
},
      {
        path: 'cart',
        loadChildren: () => import('./modules/cart/cart-module').then((m) => m.CartModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin-module').then((m) => m.AdminModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
