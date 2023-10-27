import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';

import { AppState } from '../app.states';
import * as actions from '../actions';
import { UsersHttpService } from '../../services';

@Injectable()
export class UserEffects {
  constructor(
    private store: Store<AppState>,
    private readonly actions$: Actions,
    private usersHttpService: UsersHttpService
  ) {}

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(actions.updateUser),
    switchMap(() => this.usersHttpService.getUser().pipe(
      switchMap((user) => of(actions.updateUserSuccess(user.data))),
      catchError(() => of(actions.updateUserFailure()))
    ))
  ));
}
