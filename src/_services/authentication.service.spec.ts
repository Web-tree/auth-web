import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthenticationService} from './authentication.service';
import {TokenService} from './token.service';
import {User} from '../_models';
import {environment} from '../environments/environment';
import Spy = jasmine.Spy;


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

  describe('isAuthorized()', () => {
    it('should return true then token exists', async (done) => {
      spyOn(tokenService, 'tokenExists');
      (tokenService.tokenExists as Spy).and.returnValue(true);

      authService.isAuthorized().then(value => {
        expect(value).toBeTruthy();
        done();
      });
      verifyHttpCall();
    });

    it('should return false then token does not exist', async (done) => {
      spyOn(tokenService, 'tokenExists');
      (tokenService.tokenExists as Spy).and.returnValue(false);

      authService.isAuthorized().then(value => {
        expect(value).toBeFalsy();
        done();
      });
      verifyHttpCall();
    });

    it('should check if token is valid', async (done) => {
      spyOn(tokenService, 'removeToken');
      authService.isAuthorized().then(value => {
        expect(value).toBeFalsy();
        expect((tokenService.removeToken as Spy).calls.count()).toBe(1);
        done();
      });
      verifyHttpCall({status: 401, statusText: 'Unauthorized'});
    });

    function verifyHttpCall(status = {}) {
      const call = httpMock.expectOne(environment.backendUrl + 'checkToken');
      call.flush('', status);
    }
  });

});
