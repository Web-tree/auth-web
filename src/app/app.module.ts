import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {MaterialModule} from './material.module';
import {unions, UNIONS_TOKEN} from '../_constants/unions';
import {SelectUnionComponent} from '../select-union/select-union.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SelectUnionComponent,
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
    {
      provide: UNIONS_TOKEN,
      useValue: unions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
