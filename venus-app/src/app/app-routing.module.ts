import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginUserComponent } from './login-user/login-user.component';
import { TestComponent } from './test/test.component';

var routes: Routes = [];
//Recoge el campo de storage
/*const local =localStorage.getItem("user_token") ? true:false;
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
  
}*/

routes= [
  {path: 'login', component: LoginUserComponent},
  {path: 'test', component:TestComponent,canActivate:[AuthGuard]} ,
] ;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
