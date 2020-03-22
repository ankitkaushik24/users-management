import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

@Directive({
  selector: '[aptmFormSubmit]'
})
export class FormSubmitDirective implements OnInit {

  @Input('aptmFormSubmit') rootForm: FormGroup;

  constructor(private el: ElementRef) { }

  @HostListener('click', ['$event']) onSubmit(event: MouseEvent) {
    if (this.rootForm.invalid) {
      event.preventDefault();
      const formContainer = this.el.nativeElement.closest('form');
      this.markFormControlsTouched(this.rootForm);
      const invalidEls: HTMLCollection = formContainer.querySelectorAll('input.ng-invalid');
      const lastInvalidEl = invalidEls.item(0);
      lastInvalidEl && lastInvalidEl.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }

  ngOnInit(): void {
  }

  private markFormControlsTouched(abstractControl: FormGroup | FormArray) {
    let childControls: AbstractControl[];
    if (abstractControl instanceof FormGroup) {
      childControls = Object.values(abstractControl.controls);
    } else {
      childControls = abstractControl.controls;
    }

    childControls.forEach((control: AbstractControl) => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormControlsTouched(control);
      }
    });
  }


}
