import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppRoutes } from '../../../../shared/constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
  protected readonly appRoutes = AppRoutes;

  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  });

  get password() {
    return this.form.get('password') as FormControl;
  }

  get newPassword() {
    return this.form.get('newPassword') as FormControl;
  }

  onClickChangePassword() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    }
  }
}
