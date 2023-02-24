import { HttpClientModule } from '@angular/common/http';
import { ApiServiceProvider } from './providers/api-service/api-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VistaInventarioComponent } from './vista-inventario/vista-inventario.component';

@NgModule({
  declarations: [
    AppComponent,
    VistaInventarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
