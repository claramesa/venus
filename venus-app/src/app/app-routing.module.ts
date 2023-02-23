import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootbarComponent } from './footbar/footbar.component';
import { HomeVenusComponent } from './home-venus/home-venus.component';
import { LoginUserComponent } from './login-user/login-user.component';

<<<<<<< HEAD
var routes= [
  { path: '', component: HomeVenusComponent },
  { path: 'login', component: LoginUserComponent }
];
=======
//Recoge el campo de storage
const local =localStorage.getItem("user_token") ? true:false;
var routes: Routes = [];
//Si esta activo cambia el route
if(local){
   routes= [
    { path: '', component: FootbarComponent },
    

  ];
}else{
  console.log("Entada")
  routes= [
    { path: '', component: FootbarComponent },
    { path: 'login', component: LoginUserComponent }
  ];
  
}
>>>>>>> 6fa0902ae8c1b0cc77a586726012953309074cc4


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
