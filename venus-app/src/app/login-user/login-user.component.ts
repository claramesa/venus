import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/Usuario';
import { ApiServiceProvider } from '../provider/api-service/api-service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit  {

  constructor(public api:ApiServiceProvider){
  }


  ngOnInit(): void {
    var observable$=new Observable();
    var user:Usuario=new Usuario(0,"Keagan12","password 1");

    this.api.getAllUser().subscribe( (param)=>{
      console.log(param);
        
     })

     this.api.login(user).subscribe( (param)=>{
      console.log(`Usuario ${user} respuesta ${param}`);
        
     })


  }



}
