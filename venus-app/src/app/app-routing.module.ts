import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeVenusComponent } from './home-venus/home-venus.component';
import { LoginUserComponent } from './login-user/login-user.component';

var routes= [
  { path: '', component: HomeVenusComponent },
  { path: 'login', component: LoginUserComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
