import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {RegisterComponent} from '../register';
import {UserService} from '../_services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {AlertService} from '../_services/alert.service';
import {Subject} from 'rxjs';
import {LoginComponent} from '../login';
import {AuthenticationService} from '../_services/authentication.service';
import {TokenService} from '../_services/token.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // angular material
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    UserService,
    AlertService,
    AuthenticationService,
    TokenService,
    Subject
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
