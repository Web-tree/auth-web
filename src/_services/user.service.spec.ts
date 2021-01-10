import {UserService} from './user.service';
import {TestBed} from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {User} from '../_models';
import {environment} from '../environments/environment';

describe('UserService', () => {

  let userService: UserService;
  let httpMock: HttpTestingController;
  // let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  it('create should pass and return correct user', () => {
    const testUser: User = {id: 'testId', username: 'testName', password: 'testPassword'};

    userService.create(testUser).subscribe(user => {
        expect(user).toEqual(jasmine.objectContaining(testUser));
      }
    );
    const req = httpMock.expectOne(environment.backendUrl + 'user/register');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testUser);
    req.flush(testUser);

    httpMock.verify();
  });

});
