import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar) {
  }

  success(message: string) {
    this.snackBar.open(message);
  }

  error(message: string) {
    this.snackBar.open(message);
  }
}
