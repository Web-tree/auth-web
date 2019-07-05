import {TestBed} from '@angular/core/testing';
import {AlertService} from './alert.service';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBar} from '@angular/material';


describe('Alert Service', () => {

  let alertService: AlertService;
  let snackBar: MatSnackBar;
  const msg = 'testMessage';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ]
    });
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    alertService = new AlertService(snackBar);
  });
  //
  it('should open snack bar on success message', () => {
    const message = 'someMessage';
    alertService.success(message);
    expect(snackBar.open).toHaveBeenCalledWith(message);
  });
  it('should open snack bar on error message', () => {
    const message = 'someMessage';
    alertService.success(message);
    expect(snackBar.open).toHaveBeenCalledWith(message);
  });
});
