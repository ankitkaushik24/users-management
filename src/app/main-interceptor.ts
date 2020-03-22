import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {AuthService} from './auth.service';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: req.url.replace('$rootUrl', environment.rootUrl),
      setHeaders: {
        Authorization: `Bearer ${this.authService.loggedInUser$.value}`,
        Accept: 'application/json'
      }
    });
    return next.handle(req);
  }
}
