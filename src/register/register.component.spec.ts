import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {FormsModule} from '@angular/forms';
import {UserService} from '../_services/user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AlertService} from '../_services/alert.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;
  let alertService: AlertService;

  beforeEach(async(() => {
    userService = jasmine.createSpyObj('UserService', ['create']);
    alertService = jasmine.createSpyObj('AlertService', ['success', 'error']);
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
