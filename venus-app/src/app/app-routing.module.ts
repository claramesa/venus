import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginUserComponent } from './login-user/login-user.component';
import { TestComponent } from './test/test.component';
var routes: Routes = [];
routes = [
 // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
 // { path: 'app', component: VenusAppComponent, canActivate: [AuthGuard] },
 // { path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard] },
 //{ path: 'ajuste', component: AjusteComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginUserComponent },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
