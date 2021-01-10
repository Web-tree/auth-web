import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthenticationService} from './authentication.service';
import {User} from '../_models';
import {TokenService} from './token.service';
import {environment} from '../environments/environment';

jest.mock('./token.service');
jest.mock('../environments/environment');

describe('AuthenticationService', () => {

  let authService: AuthenticationService;
  let httpMock: HttpTestingController;
  let tokenService: jest.Mocked<TokenService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService, AuthenticationService],
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthenticationService);
    tokenService = TestBed.get(TokenService);

  });

  it('#login should sent request with correct data', (done) => {
    const user: User = {username: 'testUser', password: 'testPassword'};

    authService.login(user).subscribe((res) => {
      expect(res).toEqual('someResponse');
      done();
    });

    const req = httpMock.expectOne(environment.backendUrl + 'token/new');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(user);
    req.flush('someResponse');
    httpMock.verify();
  });

  it('#logout should call tokenService.removeToken()', () => {
    authService.logout();
    expect(tokenService.removeToken).toHaveBeenCalled();
    expect(tokenService.removeToken.mock.calls).toHaveLength(1);

  });

  describe('isAuthorized()', () => {
    it('should return true then token exists', (done) => {
      tokenService.tokenExists.mockImplementation(() => true);
      tokenService.getToken.mockImplementation(() => 'testToken');

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
      tokenService.tokenExists.mockImplementation(() => true);
      tokenService.getToken.mockImplementation(() => 'wrongToken');

      authService.isAuthorized().then(value => {
        expect(value).toBeFalsy();
        done();
      });
      verifyHttpCall({status: 401, statusText: 'Unauthorized'});
    });

    it('should make post call to backend with token', () => {
      const token = 'aToken';
      tokenService.tokenExists.mockImplementation(() => true);
      tokenService.getToken.mockImplementation(() => token);

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
