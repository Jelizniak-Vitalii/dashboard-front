import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { filter, startWith } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { IUser } from '../../../shared/models';
import { AuthFacade } from '../../../shared/state/facades';
import { AppRoutes } from '../../../shared/constants';

export interface SidebarMenuItem {
  name: string;
  link?: string;
  icon?: string;
  active?: boolean;
}

const sideMenuComponentConfig: SidebarMenuItem[] = [
  {
    name: 'Profile',
    link: AppRoutes.PROFILE,
    icon: 'person-circle'
  },
  {
    name: 'Dashboard',
    link: AppRoutes.DASHBOARD,
    icon: 'people'
  },
  {
    name: 'Products',
    link: '/ecommerce/products',
    icon: 'box-seam'
  }
]

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit {
  @Input() user!: IUser;

  config: SidebarMenuItem[] = sideMenuComponentConfig;
  isMenuOpen: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    this.getActiveRoute();
  }

  private getActiveRoute() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(this.router),
      )
      .subscribe((event: any) => this.onChangeRoute(event?.url.split('?')[0]));
  }

  onChangeRoute(link: string) {
    this.config?.forEach(item => {
      item.active = item.link === link;
    });

    this.cdRef.markForCheck();
  }

  onClickSideMenuButton() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onCLickLogout() {
    this.authFacade.logout();
  }
}
