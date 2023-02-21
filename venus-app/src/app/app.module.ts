import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { ApiServiceProvider } from './provider/api-service/api-service';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeVenusComponent } from './home-venus/home-venus.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    HomeVenusComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
   /* RouterModule.forRoot([
     
      {path: 'login', component: LoginUserComponent},
      {path: '', redirectTo: '/login', pathMatch: 'full'},
    ])*/
  ],
  providers: [ ApiServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
