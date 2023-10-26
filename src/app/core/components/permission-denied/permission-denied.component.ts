import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-permission-denied',
  templateUrl: './permission-denied.component.html',
  styleUrls: [ 'permission-denied.component.scss' ],
  imports: [
    NgStyle,
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionDeniedComponent {}
