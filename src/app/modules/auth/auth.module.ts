import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgOptimizedImage } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent, RegistrationComponent, ForgotPasswordComponent } from './components';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent
  ],
  imports: [
    AuthRoutingModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    SharedModule,
    NgIf,
  ]
})
export class AuthModule {}
