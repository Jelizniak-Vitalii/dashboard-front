import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { AuthUserModel, IApiBaseResponse, IUser } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  constructor(
    private apiService: ApiService,
  ) {}

  login(user: AuthUserModel): Observable<IApiBaseResponse<{ token: string }>> {
    return this.apiService.post<IApiBaseResponse<IUser>>('auth/login', user);
  }

  register(user: IUser): Observable<IApiBaseResponse<{ token: string }>> {
    return this.apiService.post<IApiBaseResponse<IUser>>('auth/registration', user);
  }
}
