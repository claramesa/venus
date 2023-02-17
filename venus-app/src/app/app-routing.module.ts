import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './login-user/login-user.component';

//Recoge el campo de storage
const local =localStorage.getItem("user_token") ? true:false;
var routes: Routes = [];
//Si esta activo cambia el route
if(local){
   routes= [
    { path: '', component: LoginUserComponent },
  ];
}else{
  console.log("Entada")
  routes= [
    { path: '', component: LoginUserComponent },
  ];
  
}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
