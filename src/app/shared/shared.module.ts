import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormSubmitDirective} from './form-submit.directive';
import { DualSliderComponent } from './dual-slider/dual-slider.component';

@NgModule({
  declarations: [FormSubmitDirective, DualSliderComponent],
  imports: [
    CommonModule
  ],
  exports: [CommonModule, FormSubmitDirective, DualSliderComponent]
})
export class SharedModule {
}
