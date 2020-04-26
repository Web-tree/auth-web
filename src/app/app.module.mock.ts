import {MockModule} from 'ng-mocks';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

import {modules} from './material.module';

const MaterialModulesMocks = modules.map((module) => MockModule(module));

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ...MaterialModulesMocks
  ],
  exports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialModulesMocks as any,
  ]
})
export class AppModuleMock {
}
