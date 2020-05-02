import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../_models/User';
import {sha512} from 'js-sha512';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AlertService} from '../_services/alert.service';
import {AuthenticationService} from '../_services/authentication.service';
import {TokenService} from '../_services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(
      null, [Validators.required]),
    password: new FormControl(
      null, [Validators.required])
  });
  loading = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private tokenService: TokenService,
              private alertService: AlertService) {
  }

  onSubmit({username, password}) {
    this.loading = true;
    const user: User = {username, password: sha512(password)};
    return this.authenticationService.login(user)
      .subscribe(token => {
          this.loading = false;
          if (token === null) {
            this.alertService.error('Invalid username or password');
            return;
          }

          this.tokenService.saveToken(token);
          this.alertService.success('Logged in successfully');
          if (!this.authenticationService.redirectToUnionIfNeeded(this.route.snapshot)) {
            this.router.navigate(['/select-union']);
          }
        }
      );
  }
}
