import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DatePipe, NgIf, NgOptimizedImage } from '@angular/common';
import { FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { mergeMap, of, tap } from 'rxjs';

import { UploadFileService, UsersHttpService } from '../../shared/services';
import { AuthFacade, UserFacade } from '../../shared/state/facades';
import { IUser } from '../../shared/models';
import { InputComponent } from '../../shared/components';
import { SafeUrlPipe } from '../../shared/pipes';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    NgIf,
    DatePipe,
    InputComponent,
    SafeUrlPipe
  ]
})
export class ProfileComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  user!: IUser;

  profileForm = new UntypedFormGroup({
    id: new FormControl('', {
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
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    phone: new FormControl(''),
    age: new FormControl(''),
    image: new FormControl(''),
    user_name: new FormControl(''),
    image_url: new FormControl('')
  });

  constructor(
    private cdRef: ChangeDetectorRef,
    private authFacade: AuthFacade,
    private userFacade: UserFacade,
    private usersHttpService: UsersHttpService,
    private uploadFileService: UploadFileService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  private getUser() {
    this.authFacade.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        this.user = user;
        this.profileForm.patchValue(user);
        this.cdRef.markForCheck();
      });
  }

  private saveProfile() {
    const { id, first_name, last_name, phone, email, age, user_name, image } = this.profileForm.getRawValue();
    const payload = { id, first_name, last_name, phone, age, user_name, email };

    this.usersHttpService.updateUser(payload)
      .pipe(
        mergeMap((response) =>
          image ? this.usersHttpService.updateUserImage({ id, image })
            .pipe(tap(() => this.profileForm.get('image')?.reset())) : of(null)
            .pipe(takeUntilDestroyed(this.destroyRef)))
      )
      .subscribe(() => this.userFacade.updateUser());
  }

  uploadProfileImage(event: Event) {
    const file = this.uploadFileService.getFileData(event);
    this.profileForm.patchValue({ image: file.file, image_url: file.src });
  }

  onClickSave() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
    } else {
      this.saveProfile();
    }
  }
}
