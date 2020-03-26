import {Pipe, PipeTransform} from '@angular/core';
import {NavigateService} from '../navigate.service';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'isLoading'
})
export class IsLoadingPipe implements PipeTransform {

  constructor(private navigateService: NavigateService) {
  }

  transform(loaderId: string): any {
    return this.navigateService.getLoaders().pipe(map(loaders => loaders[loaderId]));
  }

}
