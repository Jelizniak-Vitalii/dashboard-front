import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['page-not-found.component.scss'],
  imports: [
    NgOptimizedImage
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {}
