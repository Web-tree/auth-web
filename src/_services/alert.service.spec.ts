import {TestBed} from '@angular/core/testing';
import {AlertService} from './alert.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {RouterTestingModule} from '@angular/router/testing';


describe('Alert Service', () => {

  let alertService: AlertService;
  let router: Router;
  let subjectSpy: any;
  const msg = 'testMessage';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        {provide: Subject, useValue: subjectSpy}
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ]
    });
    router = TestBed.get(Router);
    subjectSpy = jasmine.createSpyObj('Subject', ['next']);
    alertService = new AlertService(router, subjectSpy);
  });

  it('#success should call subject.next method', () => {
    alertService.success(msg);
    expect(subjectSpy.next).toHaveBeenCalled();
    expect(subjectSpy.next.calls.count()).toBe(1);
  });

  it('#error should call subject.next method', () => {
    alertService.error(msg);
    expect(subjectSpy.next).toHaveBeenCalled();
    expect(subjectSpy.next.calls.count()).toBe(1);
  });

  it('#getMessage should return expected message', () => {
    const testAlertService = new AlertService(router, new Subject());
    testAlertService.error(msg);
    testAlertService.getMessage().subscribe(message => {
      expect(message).toEqual(msg);
    });
  });
});
