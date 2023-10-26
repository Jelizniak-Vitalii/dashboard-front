import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, PageNotFoundComponent, PermissionDeniedComponent } from './core/components';
import { IsAuthorizedGuard } from './shared/guards';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [IsAuthorizedGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./modules/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [IsAuthorizedGuard]
  },
  {
    path: 'order',
    loadChildren: () => import('./modules/order/order.module').then(m => m.OrderModule),
    canActivate: [IsAuthorizedGuard]
  },
  {
    path: '404',
    loadComponent: () => import('./core/components/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
    canActivate: [IsAuthorizedGuard]
  },
  {
    path: '403',
    loadComponent: () => import('./core/components/permission-denied/permission-denied.component').then(m => m.PermissionDeniedComponent),
    canActivate: [IsAuthorizedGuard]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
