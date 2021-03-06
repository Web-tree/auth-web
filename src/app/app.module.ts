import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from '../register';
import {AlertService, AuthenticationService, TokenService, UserService} from '../_services';
import {HttpClientModule} from '@angular/common/http';
import {Subject} from 'rxjs';
import {LoginComponent} from '../login';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
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
