import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {RegisterComponent} from './register.component';
import {User} from '../_models';

import {AppModuleMock} from '../app/app.module.mock';
import {AlertService} from '../_services/alert.service';
import {UserService} from '../_services/user.service';
import {of} from 'rxjs';

jest.mock('../_services/alert.service');
jest.mock('../_services/user.service');

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let submitEl: DebugElement;
  let usernameEl: DebugElement;
  let passwordEl: DebugElement;
  let userService: jest.Mocked<UserService>;
  const userName = 'someUsername';
  const password = 'somePassword';


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModuleMock,
      ],
      declarations: [RegisterComponent],
      providers: [
        AlertService,
        UserService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
    userService.create.mockImplementation(() => of({}));

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    submitEl = fixture.debugElement.query(By.css('form'));
    usernameEl = fixture.debugElement.query(By.css('input[type=text]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input fields to the model', async(() => {
    fixture.whenStable().then(() => {

      expect(component.model.username).toBeUndefined();
      usernameEl.nativeElement.value = userName;
      usernameEl.nativeElement.dispatchEvent(new Event('input'));
      expect(component.model.username).toBe(userName);

      expect(component.model.password).toBeUndefined();
      passwordEl.nativeElement.value = password;
      passwordEl.nativeElement.dispatchEvent(new Event('input'));
      expect(component.model.password).toBe(password);
    });
  }));

  it('should pass model to the service when form is submitted', () => {
    const expectedUser: User = {username: 'someUsername', password: 'somePassword'};

    spyOn(component, 'register').and.callThrough();

    usernameEl.nativeElement.value = expectedUser.username;
    usernameEl.nativeElement.dispatchEvent(new Event('input'));
    passwordEl.nativeElement.value = expectedUser.password;
    passwordEl.nativeElement.dispatchEvent(new Event('input'));

    submitEl.triggerEventHandler('ngSubmit', null);

    expect(component.register).toHaveBeenCalled();
    expect(userService.create).toHaveBeenCalledWith(expectedUser);
  });
});
