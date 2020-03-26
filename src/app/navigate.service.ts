import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  private loaders$ = new BehaviorSubject<{[key: string]: number}>({});

  constructor() { }

  activateLoader(id) {
    this.loaders$.next({
      ...this.loaders$.value,
      [id]: (this.loaders$.value[id] || 0) + 1
    });
  }

  deactivateLoader(id) {
    this.loaders$.next({
      ...this.loaders$.value,
      [id]: (this.loaders$.value[id] || 0) - 1
    });
  }

  getLoaders() {
    return this.loaders$.asObservable();
  }

  loading(id: string) {
    return <T>(source: Observable<T>) => {
      this.activateLoader(id);
      return source.pipe(
        finalize(() => this.deactivateLoader(id))
      );
    };
  }
}
