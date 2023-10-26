import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers';

const selectAuth = createFeatureSelector<AuthState>('auth');
export const selectAuthState = createSelector(selectAuth, (state: AuthState) => state);
export const selectUser = createSelector(selectAuth, (state: AuthState) => state.user);
export const selectIsAuthenticated = createSelector(selectAuth, (state: AuthState) => state.isAuthenticated);
export const selectIsInit = createSelector(selectAuth, (state: AuthState) => state.isInit);
