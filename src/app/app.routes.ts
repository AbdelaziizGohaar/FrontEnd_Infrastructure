import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
          },
          {
            path: 'register',
            loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
          }
        ]
      }
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
