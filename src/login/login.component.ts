import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, AuthenticationService, TokenService} from '../_services';
import {User} from '../_models';
import {sha512} from 'js-sha512';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  objectValues = Object.values;
  model: User = {};
  loading = false;
  returnUnion: string;
  unions = {
    mydata: {key: 'mydata', name: 'My Data', url: 'https://mydata.webtree.org/applyToken'}
  };
  loggedIn = false;

  @ViewChild('redirectForm', {read: ElementRef, static: true}) redirectForm: ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private tokenService: TokenService,
              private alertService: AlertService) {
  }

  async ngOnInit() {
    this.returnUnion = this.route.snapshot.queryParams.returnUnion;
    this.loggedIn = await this.authenticationService.isAuthorized();
    this.redirectIfNeeded();
  }

  login() {
    this.loading = true;
    const user: User = {username: this.model.username, password: sha512(this.model.password)};
    this.authenticationService.login(user)
      .subscribe(
        res => {
          this.tokenService.saveToken(JSON.parse(res).token);
          this.alertService.success('Logged in successfully');
          this.redirectIfNeeded();
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

  getToken(): string {
    return this.tokenService.getToken();
  }

  redirectIfNeeded() {
    if (this.tokenService.tokenExists() && !!this.returnUnion) {
      if (this.unions[this.returnUnion]) {
        window.location.href = `${this.unions[this.returnUnion].url}#token=${this.tokenService.getToken()}`;
      } else {
        this.alertService.error('Unknown union ' + this.returnUnion);
      }
    }
  }

  logout() {
    this.authenticationService.logout();
    this.loggedIn = false;
  }
}
