import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {AlertService} from '../_services/alert.service';
import {TokenService} from '../_services/token.service';
import {User} from '../_models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: User = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private tokenService: TokenService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model)
      .subscribe(
        token => {
          this.tokenService.saveToken(token);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
          console.log(error);
          if (error.status === 401) {
            this.alertService.error(error.error);
          } else {
            throw  error;
          }
        }
      );
  }

}
