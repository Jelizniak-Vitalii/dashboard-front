import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[inputValidation]'
})
export class InputValidationDirective {
  @Input() set valid(value: boolean) {
    this.updateValidData(value);
  };

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {}

  updateValidData(value: boolean) {
    if (value) {
      this.renderer.addClass(this.elementRef.nativeElement, 'is-invalid');
      this.renderer.addClass(this.elementRef.nativeElement, 'border-danger');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'is-invalid');
      this.renderer.removeClass(this.elementRef.nativeElement, 'border-danger');
    }
  }
}
