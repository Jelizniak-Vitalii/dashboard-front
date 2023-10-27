import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AppRoutes } from '../../../../shared/constants';
import { AuthFacade } from '../../../../shared/state/facades';
import { AuthHttpService } from '../../../../shared/services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {
  private destroyRef = inject(DestroyRef);

  authForm = new UntypedFormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    first_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    last_name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    phone: new FormControl(''),
    age: new FormControl(1)
  });

  appRoutes = AppRoutes;
  registrationMessage: string = '';

  get email() {
    return this.authForm.get('email') as FormControl;
  }

  get password() {
    return this.authForm.get('password') as FormControl;
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    private authHttpService: AuthHttpService,
    private authFacade: AuthFacade
  ) {}

  private registration() {
    this.authHttpService.register(this.authForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        {
          next: (response =>this.authFacade.registrationSuccess(response.data.token)),
          error: (error => {
            this.registrationMessage = error;
            this.cdRef.markForCheck()
          })
        });
  }

  onClickRegistration() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
    } else {
      this.registration();
    }
  }
}
