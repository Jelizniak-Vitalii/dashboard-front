import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputValidationDirective } from '../../directives';

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    InputValidationDirective
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() invalid: boolean = false;
  @Input() readonly: boolean = false;
  @Input() placeholder: string = '';
  @Input() title: string = '';
  @Input() type: string = 'text';
  @Input() validationMessage: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;

  @Output() inputValueChange: EventEmitter<string | number> = new EventEmitter();

  inputValue!: string | number;

  private onTouched = () => {};

  private onChange: (value: string | number) => void = () => {};

  constructor(
    private cdRef: ChangeDetectorRef,
  ) {}

  registerOnChange(onChange: (value: string | number) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  writeValue(value: string | number): void {
    this.inputValue = value;

    this.cdRef.markForCheck();
  }

  onInputChange(value: string | number) {
    this.writeValue(value);
    this.onChange(value);

    this.inputValueChange.emit(value);
  }
}
