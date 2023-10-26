import { ActionReducerMap } from '@ngrx/store';

import * as auth from './reducers/auth.reducers';
import { AuthEffects, UserEffects } from './effects';

export interface AppState {
  auth: auth.AuthState;
}
export const reducers: ActionReducerMap<AppState> = {
  auth: auth.authReducer
}

export const effects = [
  AuthEffects,
  UserEffects
];
