import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IProduct } from '../../../../shared/models';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls: ['product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product!: IProduct;
}
