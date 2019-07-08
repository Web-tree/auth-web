import {TestBed} from '@angular/core/testing';
import {TokenService} from './token.service';


describe('TokenService', () => {

  let tokenService: TokenService;
  let tokenName: string;
  let token: string;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService],

    });

    tokenService = TestBed.get(TokenService);
    tokenName = 'token';
    token = 'Bearer sometokenhere';
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('#saveToken should save token correct', () => {
    tokenService.saveToken(token);
    expect(localStorage.getItem(tokenName)).toEqual(token);

  });

  it('#getToken should return correct token', () => {
    localStorage.setItem(tokenName, token);
    expect(tokenService.getToken()).toEqual(token);
  });

  it('#removeToken should work correct', () => {
    tokenService.saveToken(token);
    expect(localStorage.getItem(tokenName)).toEqual(token);
    tokenService.removeToken();
    expect(tokenService.getToken()).toBeNull();

  });

  it('#tokenExist should return true if token exists', () => {
    tokenService.saveToken(token);
    expect(tokenService.tokenExists()).toBeTruthy();

  });

  it('#tokenExist should return false if token does not exists', () => {
    expect(tokenService.tokenExists()).toBeFalsy();
  });

});
