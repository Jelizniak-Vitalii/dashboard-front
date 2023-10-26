import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../app.states';
import { updateUser } from '../actions';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  constructor(
    private store: Store<AppState>
  ) {}

  updateUser() {
    this.store.dispatch(updateUser());
  }
}
