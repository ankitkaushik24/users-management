import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormSubmitDirective} from './form-submit.directive';
import { DualSliderComponent } from './dual-slider/dual-slider.component';
import { IsLoadingPipe } from './is-loading.pipe';

@NgModule({
  declarations: [FormSubmitDirective, DualSliderComponent, IsLoadingPipe],
  imports: [
    CommonModule
  ],
  exports: [CommonModule, FormSubmitDirective, DualSliderComponent, IsLoadingPipe]
})
export class SharedModule {
}
