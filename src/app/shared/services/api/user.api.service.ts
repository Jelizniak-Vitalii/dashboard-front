import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { IUser } from '../../models';
import { ApiBaseResponse } from '../../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(
    private apiService: ApiService,
  ) {}

  getUsers(): Observable<ApiBaseResponse<IUser[]>> {
    return this.apiService.get('users');
  }

  getUser(): Observable<ApiBaseResponse<IUser>> {
    return this.apiService.get<ApiBaseResponse<IUser>>('users/user');
  }

  updateUser(user: Partial<IUser>): Observable<ApiBaseResponse<IUser>> {
    return this.apiService.put<ApiBaseResponse<IUser>>('users/user', user, { id: user.id });
  }

  updateUserImage({ id, image }: { id: number; image: File }): Observable<ApiBaseResponse<IUser>> {
    const formData = new FormData();
    formData.append('id', String(id));
    formData.append('file', image);

    return this.apiService.uploadFile<ApiBaseResponse<IUser>>('users/upload-user-image', formData);
  }
}
