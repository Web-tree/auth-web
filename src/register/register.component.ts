import {Component} from '@angular/core';
import {AlertService} from '../_services/alert.service';
import {UserService} from '../_services/user.service';
import {User} from '../_models/User';
import {sha512} from 'js-sha512';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(
      null, [Validators.required]),
    password: new FormControl(
      null, [Validators.required])
  });
  loading = false;

  constructor(private userService: UserService,
              private alertService: AlertService) {
  }

  onSubmit({username, password}) {
    this.loading = true;
    const user: User = {username, password: sha512(password)};
    this.userService.create(user)
      .subscribe(
        data => {
          if (data === null) {
            this.alertService.error('Registration unsuccessful');
          } else {
            this.alertService.success('Registration successful');
          }
          // this.router.navigate(['/login']);
        });
  }
}
