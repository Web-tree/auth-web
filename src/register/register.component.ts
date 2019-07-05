import {Component, OnInit} from '@angular/core';
import {AlertService} from '../_services/alert.service';
import {UserService} from '../_services/user.service';
import {User} from '../_models';
import {sha512} from 'js-sha512';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: User = {};

  loading = false;

  constructor(
    // private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
  }

  register() {
    this.loading = true;
    const user: User = {username: this.model.username, password: sha512(this.model.password)};
    this.userService.create(user)
      .subscribe(
        data => {
          this.alertService.success('Registration successful');
          // this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
          console.log(error);
          if (error.status === 400) {
            this.alertService.error(error.error);
          } else {
            throw  error;
          }
        });
  }

  ngOnInit(): void {
  }

}
