import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Subject<Toast> = new Subject<Toast>();
  toasts$ = this.toasts.asObservable();

  showSuccessToast(message: string, delay?: number) {
    this.toasts.next({
      message,
      delay,
      classname: 'bg-success text-light'
    });
  }

  showErrorToast(message: string, delay?: number) {
    this.toasts.next({
      message,
      delay,
      classname: 'bg-danger text-light'
    });
  }
}
