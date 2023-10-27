import { NgModule } from '@angular/core';
import { CommonModule, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';

import {
  SideMenuComponent,
  MainLayoutComponent,
  HeaderComponent,
  HomeComponent
} from './components';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastComponent } from '../shared/components';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    SideMenuComponent,
    HomeComponent
  ],
  exports: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    NgStyle,
    NgOptimizedImage,
    RouterOutlet,
    NgIf,
    RouterLink,
    SharedModule,
    NgxSpinnerModule,
    ToastComponent
  ]
})
export class CoreModule {}
