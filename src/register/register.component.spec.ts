import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {AlertService} from '../_services/alert.service';
import {UserService} from '../_services/user.service';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {User} from '../_models';
import {sha512} from 'js-sha512';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let submitEl: DebugElement;
  let usernameEl: DebugElement;
  let passwordEl: DebugElement;
  let userService: UserService;
  let alertService: AlertService;
  const userName = 'someUsername';
  const password = 'somePassword';


  beforeEach(async(() => {
    userService = jasmine.createSpyObj('UserService', ['create']);
    alertService = jasmine.createSpyObj('AlertService', ['success', 'error']);
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      declarations: [RegisterComponent],
      providers: [
        {provide: UserService, useValue: userService},
        {provide: AlertService, useValue: alertService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
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
    component.model = {password: 'somePassword', username: 'someUsername'};

    spyOn(component, 'register').and.callThrough();
    submitEl.triggerEventHandler('ngSubmit', null);

    expect(component.register).toHaveBeenCalled();
    const expectedUser: User = {username: 'someUsername', password: sha512('somePassword')};
    expect(userService.create).toHaveBeenCalledWith(expectedUser);
  });
});
