import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent, RegistrationComponent, ForgotPasswordComponent } from './components';
import { AppRoutes } from '../../shared/constants';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: AppRoutes.LOGIN,
        pathMatch: 'full'
      },
      {
        path: AppRoutes.LOGIN,
        component: LoginComponent
      },
      {
        path: AppRoutes.REGISTRATION,
        component: RegistrationComponent
      },
      {
        path: AppRoutes.FORGOT_PASSWORD,
        component: ForgotPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
