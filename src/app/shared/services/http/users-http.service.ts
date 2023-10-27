import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IApiBaseResponse, IUser } from '../../models';
import { ApiService } from '../http';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {
  constructor(
    private apiService: ApiService,
  ) {}

  getUsers(): Observable<IApiBaseResponse<IUser[]>> {
    return this.apiService.get('users');
  }

  getUser(): Observable<IApiBaseResponse<IUser>> {
    return this.apiService.get<IApiBaseResponse<IUser>>('users/user');
  }

  updateUser(user: Partial<IUser>): Observable<IApiBaseResponse<IUser>> {
    return this.apiService.put<IApiBaseResponse<IUser>>('users/user', user, {}, { id: user.id });
  }

  updateUserImage({ id, image }: { id: number; image: File }): Observable<IApiBaseResponse<IUser>> {
    const formData = new FormData();
    formData.append('id', String(id));
    formData.append('file', image);

    return this.apiService.post<IApiBaseResponse<IUser>>('users/upload-user-image', formData, { headers: {} });
  }
}
