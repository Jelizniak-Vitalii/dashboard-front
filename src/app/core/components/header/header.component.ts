import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IUser } from '../../../shared/models';
import { AppRoutes } from '../../../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() user!: IUser;

  appRoutes = AppRoutes;
}
