import {Component, OnInit} from '@angular/core';
import {AlertService} from '../_services/alert.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  loading = false;

  constructor(
    // private router: Router,
              private userService: UserService,
              private alertService: AlertService) {
  }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
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
