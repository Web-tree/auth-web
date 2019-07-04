import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {User} from '../_models';
import {sha512} from 'js-sha512';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {AlertService} from '../_services/alert.service';
import {TokenService} from '../_services/token.service';
import {AuthenticationService} from '../_services/authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {MatInputModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitEl: DebugElement;
  let usernameEl: DebugElement;
  let passwordEl: DebugElement;
  let alertService: AlertService;
  let tokenService: TokenService;
  let authenticationService: AuthenticationService;

  beforeEach(async(() => {
    alertService = jasmine.createSpyObj('AlertService', ['success', 'error']);
    tokenService = jasmine.createSpyObj('TokenService', ['saveToken', 'tokenExists', 'getToken']);
    authenticationService = jasmine.createSpyObj('AuthenticationService', ['login', 'logout', 'isAuthorized']);
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      declarations: [LoginComponent],
      providers: [
        {provide: AlertService, useValue: alertService},
        {provide: TokenService, useValue: tokenService},
        {provide: AuthenticationService, useValue: authenticationService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    submitEl = fixture.debugElement.query(By.css('form'));
    usernameEl = fixture.debugElement.query(By.css('input[type=text]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass user to the service when form is submitted', () => {
    component.model = {password: 'somePassword', username: 'someUsername'};

    spyOn(component, 'login').and.callThrough();
    submitEl.triggerEventHandler('ngSubmit', null);

    expect(component.login).toHaveBeenCalled();
    const expectedUser: User = {username: 'someUsername', password: sha512('somePassword')};
    expect(authenticationService.login).toHaveBeenCalledWith(expectedUser);
  });
});
