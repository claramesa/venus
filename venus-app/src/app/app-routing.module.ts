import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';
import { VenusAppComponent } from './venus-app/venus-app.component';

//Recoge el campo de storage
const local = localStorage.getItem("user_token") ? true : false;
var routes: Routes = [];
//Si esta activo cambia el route
if (local) {
  routes = [
    { path: '', component: LoginUserComponent },
  ];
} else {
  routes = [
    { path: '', component: LoginUserComponent },
    { path: 'venus-app', component: VenusAppComponent },

  ];

}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
