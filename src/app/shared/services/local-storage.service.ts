import { Injectable, makeStateKey, StateKey, TransferState } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getJwtToken() {
    return localStorage.getItem('token');
  }

  setJwtToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeJwtToken() {
    localStorage.removeItem('token');
  }
}
