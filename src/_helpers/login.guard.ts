import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';
import {TokenService} from '../_services/token.service';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private authenticationService: AuthenticationService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (!this.tokenService.tokenExists()) {
      return true;
    }

    return this.tokenService.isTokenValid().pipe(
      map(isValid => {
        if (isValid && this.authenticationService.shouldRedirect(route.queryParamMap)) {
          this.authenticationService.redirect(route.queryParamMap);
          return true;
        }
        return true;
      })
    );
  }
}
