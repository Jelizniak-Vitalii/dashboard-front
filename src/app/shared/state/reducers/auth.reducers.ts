import { createReducer, on } from '@ngrx/store';

import {
  initFinished,
  initFinishedSuccess,
  loginFailure,
  logout,
  registrationFailure, updateUserSuccess
} from '../actions';
import { IUser } from '../../models';

export interface AuthState {
  isAuthenticated: boolean;
  isInit: boolean;
  user: IUser | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isInit: false,
  user: null,
  errorMessage: null
};

export const authReducer = createReducer(
  initialState,
  on(loginFailure, (state: AuthState, { error }) => ({
    ...state,
    errorMessage: error || 'Incorrect email or password.'
  })),
  on(registrationFailure, (state: AuthState, { error }) => ({
    ...state,
    errorMessage: error || 'That email is already in use.'
  })),
  on(initFinished, (state: AuthState) => ({
    ...state,
    isInit: true,
  })),
  on(initFinishedSuccess, (state: AuthState, user: IUser) => ({
    ...state,
    isAuthenticated: true,
    isInit: true,
    errorMessage: null,
    user
  })),
  on(updateUserSuccess, (state: AuthState, user: IUser) => ({
    ...state,
    user
  })),
  on(logout, (state: AuthState) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }))
)
