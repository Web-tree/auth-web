import {Injectable} from '@angular/core';

import {User} from '../_models';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  create(user: User): Observable<User> {
    const url = environment.backendUrl + 'user/register';
    return this.http.post<User>(url, user);
  }
}
