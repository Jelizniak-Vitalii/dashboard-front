import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthFacade } from '../../../shared/state/facades';
import { IUser } from '../../../shared/models';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit{
  private destroyRef = inject(DestroyRef);

  user!: IUser;

  constructor(
    private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    this.getUser();
  }

  private getUser() {
    this.authFacade.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => this.user = user);
  }
}
