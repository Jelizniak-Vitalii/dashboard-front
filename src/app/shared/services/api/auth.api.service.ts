import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { IUser } from '../../models';
import { ApiBaseResponse } from '../../models/api.model';
import { AuthUserModel } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(
    private apiService: ApiService,
  ) {}

  login(user: AuthUserModel): Observable<ApiBaseResponse<{ token: string }>> {
    return this.apiService.post<ApiBaseResponse<IUser>>('auth/login', user, true, true);
  }

  register(user: IUser): Observable<ApiBaseResponse<{ token: string }>> {
    return this.apiService.post<ApiBaseResponse<IUser>>('auth/registration', user, true, true);
  }
}
