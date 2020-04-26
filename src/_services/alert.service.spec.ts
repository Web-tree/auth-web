import {TestBed} from '@angular/core/testing';
import {AlertService} from './alert.service';

import {MatSnackBar} from '@angular/material';
jest.mock('@angular/material');

describe('Alert Service', () => {
  let alertService: AlertService;
  let snackBar: jest.Mocked<MatSnackBar>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        MatSnackBar
      ]
    });
    snackBar = TestBed.get(MatSnackBar);
    alertService = TestBed.get(AlertService);
  });

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
