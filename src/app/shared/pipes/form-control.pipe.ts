import { AbstractControl, FormControl } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formControl',
})
export class FormControlPipe implements PipeTransform {
  transform(value: AbstractControl): FormControl<typeof value['value']> {
    return value as FormControl<typeof value['value']>;
  }
}
