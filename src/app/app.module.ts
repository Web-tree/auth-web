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

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AlertService,
    Subject
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
