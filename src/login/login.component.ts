import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {AlertService} from '../_services/alert.service';
import {TokenService} from '../_services/token.service';
import {User} from '../_models';
import {sha512} from 'js-sha512';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  model: User = {};
  loading = false;
  isRedirected = false;
  returnUnion: string;
  redirectUnionUrl: string;
  unions = {
    mydata: 'https://mydata.webtree.org/applyToken'
  };

  @ViewChild('redirectForm', {read: ElementRef, static: true}) redirectForm: ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private tokenService: TokenService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.returnUnion = this.route.snapshot.queryParams.returnUnion;
    this.redirectUnionUrl = this.unions[this.returnUnion];
    this.isRedirected = this.tokenService.tokenExists() && !!this.returnUnion;
    if (this.isRedirected && !this.redirectUnionUrl) {
      this.alertService.error('Unknown union ' + this.returnUnion);
    }
  }

  login() {
    this.loading = true;
    const user: User = {username: this.model.username, password: sha512(this.model.password)};
    this.authenticationService.login(user)
      .subscribe(
        token => {
          this.tokenService.saveToken(token);
          this.alertService.success('Logged in successfuly');
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

  submitRedirect() {
    this.redirectForm.nativeElement.submit();
  }

  ngAfterViewInit(): void {
    if (this.isRedirected) {
      this.submitRedirect();
    }
  }
}
