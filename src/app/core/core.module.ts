import { NgModule } from '@angular/core';
import { CommonModule, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

import {
  SideMenuComponent,
  MainLayoutComponent,
  HeaderComponent,
  HomeComponent
} from './components';
import { ToastComponent } from '../shared/components';
import { SafeUrlPipe } from '../shared/pipes';

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
    NgxSpinnerModule,
    ToastComponent,
    SafeUrlPipe
  ]
})
export class CoreModule {}
