import {Injectable} from '@angular/core';

import {User} from '../_models/User';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  create(user: User): Observable<User> {
    const url = environment.backendUrl + 'user/register';

    return this.http.post<User | null>(url, user).pipe(
      catchError(({message}: HttpErrorResponse) => {
          return throwError(`${message}`);
      })
    );
  }
}
