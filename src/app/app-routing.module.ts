import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {SelectUnionComponent} from '../select-union/select-union.component';
import {LoginGuard} from '../_helpers/login.guard';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'select-union', component: SelectUnionComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
