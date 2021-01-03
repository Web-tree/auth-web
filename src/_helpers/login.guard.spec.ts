import {TestBed} from '@angular/core/testing';
import {LoginGuard} from './login.guard';

import {TokenService} from '../_services/token.service';
import {AuthenticationService} from '../_services/authentication.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {isObservable, of} from 'rxjs';

jest.mock('../_services/token.service');
jest.mock('../_services/authentication.service');

describe('Login Guard', () => {
  let loginGuard: LoginGuard;
  let tokenService: jest.Mocked<TokenService>;
  let authService: jest.Mocked<AuthenticationService>;

  const routeStub = {} as ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        TokenService,
        AuthenticationService
      ]
    });
    loginGuard = TestBed.get(LoginGuard);
    tokenService = TestBed.get(TokenService);
    authService = TestBed.get(AuthenticationService);
  });

  it('should allow if token is not exist', () => {
    tokenService.tokenExists.mockImplementation(() => false);

    expect(loginGuard.canActivate(routeStub)).toBe(true);
  });

  it('should allow if token is not valid', (done) => {
    tokenService.tokenExists.mockImplementation(() => true);
    tokenService.isTokenValid.mockImplementation(() => of(false));

    const res = loginGuard.canActivate(routeStub);
    expect(isObservable(res)).toBeTruthy();
    // always true. Workaround for typescript instead of 'as Observable<boolean>'
    if (isObservable(res)) {
      res.subscribe(canActivate => {
        expect(canActivate).toBeTruthy();
        done();
      });
    }
  });

  it.each`
    requiredRedirect  | canActivate
    ${true}           | ${false}
    ${false}          | ${true}
  `('canActivate = $s if token is valid and requiredRedirect = $requiredRedirect',
    ({requiredRedirect, canActivate}) => {
      tokenService.tokenExists.mockImplementation(() => true);
      tokenService.isTokenValid.mockImplementation(() => of(true));
      authService.redirectToUnionIfNeeded.mockImplementation(() => requiredRedirect);

      const res = loginGuard.canActivate(routeStub);
      expect(isObservable(res)).toBeTruthy();
      // always true. Workaround for typescript instead of 'as Observable<boolean>'
      if (isObservable(res)) {
        res.subscribe(canActivateRes => {
          expect(canActivateRes).toBe(canActivate);
        });
      }
    });

});
