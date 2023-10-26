import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';

import { AppState } from '../app.states';
import { UserApiService } from '../../services/api';
import * as actions from '../actions';

@Injectable()
export class UserEffects {
  constructor(
    private store: Store<AppState>,
    private readonly actions$: Actions,
    private userApiService: UserApiService
  ) {}

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(actions.updateUser),
    switchMap(() => this.userApiService.getUser().pipe(
      switchMap((user) => of(actions.updateUserSuccess(user.data))),
      catchError(() => of(actions.updateUserFailure()))
    ))
  ));
}
