import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models';

export const updateUser = createAction('[User] update');
export const updateUserSuccess = createAction('[User] Update user success', props<IUser>());
export const updateUserFailure = createAction('[User] Update user failure');
