import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <section class="auth">
      <div class="auth__img-container">
        <img class="auth__img-container_img" ngSrc="../../../assets/images/auth.jpg" fill alt="">
      </div>
      <div class="auth__container">
        <router-outlet></router-outlet>
      </div>
    </section>
  `,
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {}
