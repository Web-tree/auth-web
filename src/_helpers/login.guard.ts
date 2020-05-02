import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.tokenService.tokenExists()) {
      return true;
    }

    return this.tokenService.isTokenValid().pipe(
      map(isValid => {
        if (isValid) {
          return !this.authenticationService.redirectToUnionIfNeeded(route);
        }
        return true;
      })
    );
  }
}
