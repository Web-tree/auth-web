import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {TokenService} from './token.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {User} from '../_models';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
              private tokenService: TokenService) {
  }

  login(user: User) {
    return this.http.post(environment.backendUrl + 'token/new', user, {responseType: 'text'});
  }

  logout() {
    this.tokenService.removeToken();
  }

  async isAuthorized(): Promise<boolean> {
    return this.http.get(environment.backendUrl + 'checkToken')
      .toPromise()
      .then(() => {
        return this.tokenService.tokenExists();
      }).catch((err) => {
        if (err.status !== 401) {
          console.error(err);
        }
        this.tokenService.removeToken();
        return false;
      });
  }
}
