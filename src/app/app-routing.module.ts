import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from '../register';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', component: RegisterComponent},
  {path: '**', redirectTo: 'register'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
