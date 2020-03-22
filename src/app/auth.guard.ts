import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {filter, first, map, skip, takeWhile, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.authService.loggedInUser$.value) {
      return true;
    } else {
      this.authService.urlRedirect = route.path;
      this.router.navigate(['login']);
      return false;
    }
  }

}
