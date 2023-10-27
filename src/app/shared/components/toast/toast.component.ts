import { ChangeDetectorRef, Component, HostBinding, inject, OnDestroy, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from '../../services';
import { Toast } from '../../models';

@Component({
  standalone: true,
  selector: 'app-toast',
  template: `
    <ngb-toast
      *ngFor="let toast of toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 3000"
    >
      {{toast.message}}
    </ngb-toast>
  `,
  imports: [
    NgbToast,
    NgForOf
  ],
  host: {style: 'z-index: 1200'}
})
export class ToastComponent implements OnInit, OnDestroy {
  @HostBinding('class') classes = 'toast-container position-fixed top-0 end-0 p-1';

  toasts: Toast[] = [];

  toastService = inject(ToastService);

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toastService.toasts$
      .subscribe({
        next: (toast) => {
          this.toasts = [
            ...this.toasts,
            toast
          ];

          this.cdRef.markForCheck();
        }
      });
  }

  ngOnDestroy() {
    this.toasts = [];
    this.cdRef.markForCheck();
  }
}
