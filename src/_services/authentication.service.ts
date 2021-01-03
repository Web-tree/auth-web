import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {TokenService} from './token.service';
import {environment} from '../environments/environment';
import {User} from '../_models/User';
import {ParamMap} from '@angular/router';
import {Union, UnionMap, UNIONS_TOKEN} from '../_constants/unions';
import {DOCUMENT} from '@angular/common';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  constructor(private http: HttpClient,
              private tokenService: TokenService,
              @Inject(UNIONS_TOKEN) private unions: UnionMap,
              @Inject(DOCUMENT) private document: Document,
  ) {
  }

  login(user: User): Observable<Login | null> {
    return this.http.post<{ token: string }>(environment.backendUrl + 'token/new', user)
      .pipe(
        map(res => {
          if ('token' in res) {
            return { token: res.token };
          }
          throw new Error(`Valid token is not returned. Got: ${res}`);
        }),
        catchError((error: Error | HttpErrorResponse) => {
          if ('status' in error) {
            if (error.status === 401) {
              return throwError('Invalid username or password');
            }
            return throwError(error.message || error.error);
          }
          return throwError(error);
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
  }

  shouldRedirect(queryParamMap: ParamMap): boolean {
    const returnUnion = this.getReturnUnion(queryParamMap);

    if (typeof returnUnion === 'string') {
      if (returnUnion in this.unions) {
        return true;
      } else {
        throw new Error(`Unknown union: ${returnUnion}`);
      }
    }

    return false;
  }

  redirect(queryParamMap: ParamMap): void {
    const returnUnion = this.getReturnUnion(queryParamMap);
    this.redirectToUnion(this.unions[returnUnion]);
  }

  redirectToUnion({ url }: Union): void {
    const token = this.tokenService.getToken();

    this.document.location.href = `${url}#token=${token}`;
  }

  getReturnUnion(queryParamMap: ParamMap): string | null {
    return queryParamMap.get('returnUnion');
  }
}
