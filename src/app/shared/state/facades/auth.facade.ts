import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';

import { AuthUserModel } from '../../models/auth.model';
import { init, initUser, login, loginSuccess, logout, registration } from '../actions';
import { IUser } from '../../models';
import { AppState } from '../app.states';
import { selectAuthState, selectIsAuthenticated, selectIsInit, selectUser } from '../selectors';
import { AuthState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  isInit$: Observable<boolean> = this.store.select(selectIsInit);
  isAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated);
  selectAuthState$: Observable<AuthState> = this.store.select(selectAuthState);
  user$: Observable<IUser> = this.store.select(selectUser)
    .pipe(
      filter((user: IUser | null) => !!user),
      map(user => user as IUser)
    );

  constructor(
    private store: Store<AppState>
  ) {}

  init() {
    this.store.dispatch(init());
  }

  login(user: AuthUserModel) {
    this.store.dispatch(login(user));
  }

  loginSuccess(token: string) {
    this.store.dispatch(loginSuccess({ token }));
  }

  registration(user: IUser) {
    this.store.dispatch(registration(user));
  }

  registrationSuccess(token: string) {
    this.store.dispatch(loginSuccess({ token }));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
