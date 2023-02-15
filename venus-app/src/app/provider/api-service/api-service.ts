import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/modelo/Usuario';
import { InterfaceUser } from 'src/app/modelo/interfaces';
import { set, remove } from "local-storage"
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class ApiServiceProvider {

    private URL = "https://63e5f85a83c0e85a868a1df1.mockapi.io/api/who/users";
    private URLDjango = "https:/localhost:8000";

    constructor(public http: HttpClient) { }

    authenticatedusuario() {
        return localStorage.getItem("user");
    }//end_auth

    getAllUser(): Observable<[]> {
        return this.http.get<any>(`${this.URL}`);
    }//end_all_user

    getUsuario(user: Usuario) {
        var usuarioVar: Usuario;
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get(this.URL).toPromise()
                .then((data: any) => {
                    usuarioVar = data.map((res: Usuario) => {
                        if (res.username === user.username) {
                            if (res.password === user.password) {
                                localStorage.setItem("user_token", JSON.stringify("__TOKEN__"));
                                resolve({ "user": true, "message": "Usuario correcto" });
                            }
                            reject({ "user": false, "message": "Contraseña incorrecta" });
                        }
                        reject({ "user": false, "message": "No existe el usuario" });
                    });

                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });

        return promise;
    }//end_usuario

    checkUser(user: Usuario) {

       
        
       const headers= new HttpHeaders()
         .set('content-type', 'application/json')
         .set('Access-Control-Allow-Origin', '*');
                const body = {
            'username': user.username,
            'password': user.password
        }
        return this.http.post(this.URLDjango + "/api/auth", body, {headers});

    }//end_user_django

}//end_class
