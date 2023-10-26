import { createAction, props } from '@ngrx/store';
import { AuthUserModel } from '../../models/auth.model';
import { IUser } from '../../models';

export const init = createAction('[Auth] Init');
export const initFinished = createAction('[Auth] Init finished');
export const initFinishedSuccess = createAction('[Auth] Init finished success', props<any>());
export const initUser = createAction('[Auth] Init user');

export const login = createAction('[Auth] Login', props<AuthUserModel>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const registration = createAction('[Auth] Registration', props<IUser>());
export const registrationSuccess = createAction('[Auth] Registration Success', props<{ token: string }>());
export const registrationFailure = createAction('[Auth] Registration Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');
