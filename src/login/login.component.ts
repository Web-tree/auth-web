import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {AlertService} from '../_services/alert.service';
import {TokenService} from '../_services/token.service';
import {User} from '../_models';
import {sha512} from 'js-sha512';

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
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  login() {
    this.loading = true;
    const user: User = {username: this.model.username, password: sha512(this.model.password)};
    this.authenticationService.login(user)
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
