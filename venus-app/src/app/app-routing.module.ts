import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaInventarioComponent } from './vista-inventario/vista-inventario.component';

const routes: Routes = [{
  path: 'inventario',
  title: 'Inventario',
  component: VistaInventarioComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
