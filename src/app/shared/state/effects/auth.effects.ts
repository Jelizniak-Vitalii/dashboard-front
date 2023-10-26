import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, finalize, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import * as actions from '../actions';
import { AuthApiService, UserApiService } from '../../services/api';
import { AuthUserModel } from '../../models/auth.model';
import { TokenService } from '../../services/token.service';
import { IUser } from '../../models';
import { AppState } from '../app.states';

@Injectable()
export class AuthEffects {
  constructor(
    private store: Store<AppState>,
    private readonly actions$: Actions,
    private router: Router,
    private authService: AuthApiService,
    private userApiService: UserApiService,
    private tokenService: TokenService
  ) {}

  init$ = createEffect(() => this.actions$.pipe(
    ofType(actions.init),
    switchMap(() => this.userApiService.getUser().pipe(
      switchMap((user) => of(actions.initFinishedSuccess(user.data))),
      catchError(() => of(actions.initFinished(), actions.logout())))
  )));

  initUser$ = createEffect(() => this.actions$.pipe(
    ofType(actions.initUser),
    switchMap(() => this.userApiService.getUser().pipe(
      switchMap((user) => of(actions.initFinished(), actions.initFinishedSuccess(user.data))),
      catchError(() => of(actions.initFinished(), actions.logout())),
      finalize(() => this.router.navigate(['/']))
      )
    )
  ))

  login$ = createEffect(() => this.actions$.pipe(
    ofType(actions.login),
    switchMap((value: AuthUserModel) => this.authService.login(value)
      .pipe(
        map((result) => actions.loginSuccess({ token: result.data.token })),
        catchError((error) => of(actions.loginFailure(error)))
      )),
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loginSuccess),
    tap((token) => {
      this.tokenService.setJwtToken(token.token);
      this.store.dispatch(actions.initUser());
    })
    ),{ dispatch: false }
  );

  registrationSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(actions.registrationSuccess),
    tap((token) => {
      this.tokenService.setJwtToken(token.token);
      this.store.dispatch(actions.initUser());
    })
  ), { dispatch: false });

  $registration = createEffect(() => this.actions$.pipe(
    ofType(actions.registration),
    switchMap((value: IUser) => {
      return this.authService.register(value)
        .pipe(
          map((result) => {
            this.tokenService.setJwtToken(result.data.token);
            this.router.navigate(['/']);

            return actions.init();
          }),
          catchError((error) => of(actions.registrationFailure(error.error.message)))
        )
    }))
  );

  $logout = createEffect(() => this.actions$.pipe(
    ofType(actions.logout),
    tap(() => {
      this.tokenService.removeJwtToken();
      this.router.navigate(['/auth/login']);
    })), { dispatch: false }
  );
}
