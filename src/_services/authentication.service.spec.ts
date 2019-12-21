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
    afterEach(() => {
      tokenService.removeToken();
    });

    it('should return true then token exists', async (done) => {
      tokenService.saveToken('aToken');

      authService.isAuthorized().then(value => {
        expect(value).toBeTruthy();
        done();
      });
      verifyHttpCall();
    });

    it('should return false then token does not exist', async (done) => {
      authService.isAuthorized().then(value => {
        expect(value).toBeFalsy();
        done();
      });

    });

    it('should not call backend if token not exists', () => {
      authService.isAuthorized().then();
      httpMock.expectNone(environment.backendUrl + 'checkToken');
    });

    it('should check if token is valid', done => {
      tokenService.saveToken('aToken');
      authService.isAuthorized().then(value => {
        expect(value).toBeFalsy();
        expect(tokenService.tokenExists()).toBeFalsy();
        done();
      });
      verifyHttpCall({status: 401, statusText: 'Unauthorized'});
    });

    it('should make post call to backend with token', () => {
      const token = 'aToken';
      tokenService.saveToken(token);

      authService.isAuthorized().then();

      const req = verifyHttpCall();
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(token);
    });

    function verifyHttpCall(status = {status: 200, statusText: 'Ok'}) {
      const call = httpMock.expectOne(environment.backendUrl + 'checkToken');
      call.flush('', status);
      return call;
    }
  });

});
