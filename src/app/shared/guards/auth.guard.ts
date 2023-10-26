import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter, map, Observable, switchMap } from 'rxjs';

import { AuthFacade } from '../state/facades';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authFacade: AuthFacade
  ) {}

  canActivate(): Observable<boolean> {
    return this.authFacade.isInit$
      .pipe(
        filter(isInit => isInit),
        switchMap(() => this.authFacade.isAuthenticated$
          .pipe(map(isAuthenticated => !isAuthenticated))
        )
      );
  }
}
