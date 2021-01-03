import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {of} from 'rxjs';

import {LoginComponent} from './login.component';
import {User} from '../_models/User';

import {AppModuleMock} from '../app/app.module.mock';
import {AlertService} from '../_services/alert.service';
import {TokenService} from '../_services/token.service';
import {AuthenticationService} from '../_services/authentication.service';

jest.mock('../_services/alert.service');
jest.mock('../_services/token.service');
jest.mock('../_services/authentication.service');

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitEl: DebugElement;
  let usernameEl: DebugElement;
  let passwordEl: DebugElement;
  let authenticationService: jest.Mocked<AuthenticationService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModuleMock,
      ],
      declarations: [LoginComponent],
      providers: [
        AlertService,
        TokenService,
        AuthenticationService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    authenticationService = TestBed.get(AuthenticationService);
    authenticationService.login.mockImplementation(() => of('user'));
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    submitEl = fixture.debugElement.query(By.css('form'));
    usernameEl = fixture.debugElement.query(By.css('input[type=text]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass user to the service when form is submitted', () => {
    const expectedUser: User = {username: 'someUsername', password: 'somePassword'};
    spyOn(component, 'login').and.callThrough();
    usernameEl.nativeElement.value = expectedUser.username;
    usernameEl.nativeElement.dispatchEvent(new Event('input'));
    passwordEl.nativeElement.value = expectedUser.password;
    passwordEl.nativeElement.dispatchEvent(new Event('input'));

    submitEl.triggerEventHandler('ngSubmit', null);

    expect(component.login).toHaveBeenCalled();
    expect(authenticationService.login).toHaveBeenCalledWith(expectedUser);
  });
});
