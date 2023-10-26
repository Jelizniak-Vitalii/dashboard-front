import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutes } from '../../../shared/constants';

@Component({
  selector: 'app-home',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.router.navigate([AppRoutes.DASHBOARD]);
  }
}
