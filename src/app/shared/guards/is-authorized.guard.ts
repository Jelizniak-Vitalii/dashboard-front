import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { filter, map, Observable, switchMap } from 'rxjs';

import { AuthFacade } from '../state/facades';
import { AppRoutes } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class IsAuthorizedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authFacade: AuthFacade
  ) {}

  canActivate(): Observable<boolean> {
    return this.authFacade.isInit$
      .pipe(
        filter(isInit => isInit),
        switchMap(() => this.authFacade.isAuthenticated$
          .pipe(
            map(isAuthenticated => {
              if (!isAuthenticated) {
                // this.router.navigate([AppRoutes.AUTH_LOGIN]);
                return false;
              }

              return true;
            })
          )
        )
      );
  }
}
