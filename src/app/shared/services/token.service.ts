import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private localStorageService: LocalStorageService
  ) {}

  setJwtToken(token: string) {
    this.localStorageService.setJwtToken(token);
  }

  getJwtToken(): string | null {
    return this.localStorageService.getJwtToken();
  }

  removeJwtToken() {
    this.localStorageService.removeJwtToken();
  }
}
