import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PopupErrorComponent } from './components';

const PIPES: never[] = [];

const COMPONENTS = [
  PopupErrorComponent
];

const DIRECTIVES: never[] = [];

@NgModule({
  declarations: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule {}
