import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {TokenService} from './token.service';
import {environment} from '../environments/environment';
import {User} from '../_models/User';
import {AlertService} from './alert.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Union, UnionMap, UNIONS_TOKEN} from '../_constants/unions';
import {DOCUMENT} from '@angular/common';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  constructor(private http: HttpClient,
              private alertService: AlertService,
              private tokenService: TokenService,
              @Inject(UNIONS_TOKEN) private unions: UnionMap,
              @Inject(DOCUMENT) private document: Document,
  ) {
  }

  login(user: User): Observable<string | null> {
    return this.http.post<{ token: string }>(environment.backendUrl + 'token/new', user)
      .pipe(
        map(res => {
          if ('token' in res) {
            return res.token;
          }
          return null;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          if (error.status === 401) {
            this.alertService.error(error.error);
            return of(null);
          }
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
  }

  redirectToUnionIfNeeded(route: ActivatedRouteSnapshot): boolean {
    const returnUnion = route.queryParamMap.get('returnUnion');

    if (typeof returnUnion === 'string') {
      if (returnUnion in this.unions) {
        this.redirectToUnion(this.unions[returnUnion]);
        return true;
      } else {
        this.alertService.error(`Unknown union: ${returnUnion}`);
      }
    }

    return false;
  }

  redirectToUnion({url}: Union): void {
    const token = this.tokenService.getToken();
    const tokenizedUrl = `${url}#token=${token}`;

    this.document.location.href = tokenizedUrl;
  }
}
