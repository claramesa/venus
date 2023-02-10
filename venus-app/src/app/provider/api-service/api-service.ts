import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Usuario } from 'src/app/modelo/Usuario';
import { InterfaceUser } from 'src/app/modelo/interfaces';
import { set, remove } from "local-storage"
import { Route } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class ApiServiceProvider {

    private URL = "https://63e5f85a83c0e85a868a1df1.mockapi.io/api/who/users";
    constructor(public http: HttpClient) { }

    authenticatedusuario() {
        return localStorage.getItem("user");

    }
    /*
    Este método devuelve un objeto 'Promise'.
    Esto es un elemento asíncrono que puede finalizar de dos formas: correctamente, en cuyo caso sale con resolve, o bien de forma incorrecta, acabando en ese caso con reject.
    El método llama al método get del atributo http, pasándole como parámetro la url que devuelve la colección alumnos de la Api.
    Lo que devuelve este método lo convertimos a Promise, para luego evaluar su resultado mediante then y catch.
    Si el acceso a la Api ha ido bien el código que se ejecuta es el ubicado en la cláusula then. Si ha ido mal se ejecuta el código ubicado en la cláusula catch.
    Si todo ha ido bien convertimos el array de objetos Json que nos llega a un array de objetos alumnos, y lo devolvemos con resolve.
    Si el acceso ha ido mal devolvemos el mensaje de error que no llega mediante reject.
    */

    getAllUser(): Observable<[]> {

        return this.http.get<any>(`${this.URL}`);

    }

    getUsuario(user: Usuario) {
        var usuarioVar: Usuario;
        let promise = new Promise<any>((resolve, reject) => {
            this.http.get(this.URL).toPromise()
                .then((data: any) => {
                    usuarioVar = data.map((res: Usuario) => {
                        if (res.username === user.username){
                            
                            if(res.password === user.password) {
                                localStorage.setItem("user_token",JSON.stringify("__TOKEN__"));
                                resolve({"user":true,"message":"Usuario correcto"});
                            }
                           
                            reject({"user":false,"message":"Contraseña incorrecta"});

                        }
                        reject({"user":false,"message":"No existe el usuario"});

                      
                    });

                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });

        return promise;
    }

}//end_class
