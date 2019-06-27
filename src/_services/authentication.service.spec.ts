import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthenticationService} from './authentication.service';
import {TokenService} from './token.service';
import {User} from '../_models';


describe('AuthenticationService', () => {

  let authService: AuthenticationService;
  let httpMock: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService, AuthenticationService],
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthenticationService);
    tokenService = TestBed.get(TokenService);

  });

  it('#login should sent request with correct data', () => {
    const user: User = {username: 'testUser', password: 'testPassword'};

    authService.login(user).subscribe(() => {});

    const req = httpMock.expectOne('http://localhost:9000/rest/token/new');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(user);
    httpMock.verify();
  });

  it('#logout should call tokenService.removeToken()', () => {
    const tokenSpy = jasmine.createSpyObj('TokenService', ['removeToken']);
    const authServiceWithSpy = new AuthenticationService(null, tokenSpy);

    authServiceWithSpy.logout();
    expect(tokenSpy.removeToken).toHaveBeenCalled();
    expect(tokenSpy.removeToken.calls.count()).toBe(1);

  });

  it('#isAuthorized should return expected value from tokenService', () => {
    const tokenSpy = jasmine.createSpyObj('TokenService', ['tokenExists']);
    tokenSpy.tokenExists.and.returnValue(true);
    const authServiceWithSpy = new AuthenticationService(null, tokenSpy);

    expect(authServiceWithSpy.isAuthorized()).toBeTruthy();
    expect(tokenSpy.tokenExists).toHaveBeenCalled();
    expect(tokenSpy.tokenExists.calls.count()).toBe(1);
  });


});

