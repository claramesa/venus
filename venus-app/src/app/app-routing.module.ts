import { VistaInventarioComponent } from './vista-inventario/vista-inventario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

var routes: Routes = [
  { path: '', component: VistaInventarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
