import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/Usuario';
import { ApiServiceProvider } from '../provider/api-service/api-service';
import Swal from "sweetalert2"
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  static token: any = "";
  //formulario
  profileForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  //Guarda los errores
  errores: String[] = []
  //Si es exito  muestra que es exito
  exito: boolean = false;
  constructor(public api: ApiServiceProvider, private fb: FormBuilder, private router: Router) {
    this.errores = new Array();
  }

  //Consulta el usuario a la api y comprueba si es correcto
  consultar(token: any) {
    this.api.findUser(token).subscribe((data: any) => {
      this.exito = true;
      Swal.fire({
        title: 'Correcto',
        text: `Buenas ${data.username}`,
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      setTimeout(() => {
        console.log("Entra")
        this.router.navigate(['/', 'home']);

      }, 500);
    }, (err) => {
      Swal.fire({
        title: 'Error',
        text: `No puedes acceder`,
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }

    );
  }

  //Cambio de cada input controlando el evento 
  onChangeInput(ev: Event) {
    this.errores = [];
  }

  //Metodo de envio del formulario
  onSubmit() {
    let user: Usuario = new Usuario(0, "", "")
    this.errores = [];
    this.exito = false;
    user.username = this.profileForm.value.username ? this.profileForm.value.username : "";
    user.password = this.profileForm.value.password ? this.profileForm.value.password : "";
    this.login();
  }
  /* emailDomainValidator(control: FormControl) { 
    let email = control.value; 
    if (email && email.indexOf("@") != -1) { 
      let [_, domain] = email.split("@"); 
      if (domain !== "codecraft.tv") { 
        return {
          emailDomain: {
            parsedDomain: domain
          }
        }
      }
    }
    return null; 
  }*/

  async login() {
    let user: Usuario = new Usuario(0, "", "")
    user.username = this.profileForm.value.username ? this.profileForm.value.username : "";
    user.password = this.profileForm.value.password ? this.profileForm.value.password : "";
    await this.api.checkUser(user).subscribe((data: any) => {
      let token = localStorage.setItem("user_token", JSON.stringify(data.token));
      this.consultar(data.token);
    }, (err) => {
      localStorage.removeItem("user_token");
      Swal.fire({
        title: 'Error',
        text: `No puedes acceder`,
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      });
    });
  }

  ngOnInit(): void {
    let tokenLocal = localStorage.getItem('user_token');
    
  }



}
