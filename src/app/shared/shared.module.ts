import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

import { FormControlPipe, SafeUrlPipe } from './pipes';
import { InputComponent, PopupErrorComponent } from './components';
import { InputValidationDirective } from './directives';

const PIPES = [
  FormControlPipe,
  SafeUrlPipe
];

const COMPONENTS = [
  InputComponent,
  PopupErrorComponent
];

const DIRECTIVES = [
  InputValidationDirective
];

@NgModule({
  declarations: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  exports: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule {}
