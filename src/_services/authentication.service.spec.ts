import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {DOCUMENT} from '@angular/common';
import {AuthenticationService} from './authentication.service';
import {User} from '../_models/User';

import {TokenService} from './token.service';
import {environment} from '../environments/environment';
import {AlertService} from './alert.service';
import {UNIONS_TOKEN} from '../_constants/unions';
import {unions as unionsStub} from '../_constants/__mock__/unions';

jest.mock('./token.service');
jest.mock('../environments/environment');
jest.mock('./alert.service');

const documentStub = {
  location: {
   set href(value) {
   }
  },
};

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let httpMock: HttpTestingController;
  let tokenService: jest.Mocked<TokenService>;
  let alertService: jest.Mocked<AlertService>;
  const locationHrefSetterSpy = jest.spyOn(documentStub.location, 'href', 'set');

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        AlertService,
        TokenService,
        {provide: UNIONS_TOKEN, useValue: unionsStub},
        {provide: DOCUMENT, useValue: documentStub},
      ],
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthenticationService);
    tokenService = TestBed.get(TokenService);
    alertService = TestBed.get(AlertService);
  });

  describe('#login', () => {
    const user: User = {username: 'testUser', password: 'testPassword'};
    let req: TestRequest;
    let responseBody;
    beforeEach(() => {
      responseBody = null;
    });

    it('should return token received from server', (done) => {
      responseBody = {token: 'testToken'};
      authService.login(user).subscribe((res) => {
        expect(res).toEqual(responseBody.token);
        done();
      });
      req.flush(responseBody);
    });

    afterEach(() => {
      // expect(req.request.method).toEqual('POST');
      // expect(req.request.body).toEqual(user);

      httpMock.verify();
    });
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

      // authService.isAuthorized().then(value => {
      //   expect(value).toBeTruthy();
      //   done();
      // });
      verifyHttpCall();
    });

    it('should return false then token does not exist', async (done) => {
      // authService.isAuthorized().then(value => {
      //   expect(value).toBeFalsy();
      //   done();
      // });

    });

    it('should not call backend if token not exists', () => {
      // authService.isAuthorized().then();
      httpMock.expectNone(environment.backendUrl + 'checkToken');
    });

    it('should check if token is valid', done => {
      tokenService.tokenExists.mockImplementation(() => true);
      tokenService.getToken.mockImplementation(() => 'wrongToken');

      // authService.isAuthorized().then(value => {
      //   expect(value).toBeFalsy();
      //   done();
      // });
      verifyHttpCall({status: 401, statusText: 'Unauthorized'});
    });

    it('should make post call to backend with token', () => {
      const token = 'aToken';
      tokenService.tokenExists.mockImplementation(() => true);
      tokenService.getToken.mockImplementation(() => token);

      // authService.isAuthorized().then();

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
