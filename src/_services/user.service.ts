import {Injectable} from '@angular/core';

import {User} from '../_models/User';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {catchError} from 'rxjs/operators';
import {of, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  create(user: User): Observable<User | null> {
    const url = environment.backendUrl + 'user/register';

    return this.http.post<User | null>(url, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        if (error.status === 400) {
          return of(null);
        } else {
          return throwError(error);
        }
      })
    );
  }
}
