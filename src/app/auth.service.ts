import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser$: BehaviorSubject<string>;
  urlRedirect = 'users';

  constructor(private http: HttpClient, private router: Router) {
    this.loggedInUser$ = new BehaviorSubject<string>(sessionStorage.getItem('userToken'));
  }

  loginUser(userDetails) {
    return this.http.post('$rootUrl/api/user/login', userDetails,
      {headers: {'Content-Type': 'application/json'}}
    ).pipe(tap((res: any) => {
        this.loggedInUser$.next(res.token);
      }),
      catchError(err => {
        this.loggedInUser$.next('token');
        return of(err);
      }));
  }

  logout() {
    this.loggedInUser$.next(null);
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
