import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthApiService } from '../../../../shared/services/api';
import { AppRoutes } from '../../../../shared/constants';
import { AuthFacade } from '../../../../shared/state/facades';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private destroyRef = inject(DestroyRef);

  authForm = new FormGroup({
    email: new FormControl('test4@gmail.com', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('test1', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  appRoutes = AppRoutes;
  loginMessage: string = '';

  get email() {
    return this.authForm.get('email') as FormControl;
  }

  get password() {
    return this.authForm.get('password') as FormControl;
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    private authApiService: AuthApiService,
    private authFacade: AuthFacade
  ) {}

  private login() {
    this.authApiService.login(this.authForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        {
          next: (response =>this.authFacade.loginSuccess(response.data.token)),
          error: (error => {
            this.loginMessage = error;
            this.cdRef.markForCheck();
          })
        }
      );
  }

  onClickLogin() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
    } else {
      this.login();
    }
  }
}
