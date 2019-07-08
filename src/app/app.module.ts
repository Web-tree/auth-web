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
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSelectModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';

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
    // angular material
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule
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
