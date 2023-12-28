import { NgModule } from '@angular/core';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SafeUrlPipe } from '../../../../shared/pipes';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent
  ],
  imports: [ProductsRoutingModule, SafeUrlPipe]
})
export class ProductsModule {}
