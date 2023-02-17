import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from 'src/app/modelo/Usuario';
import { InterfaceUser } from 'src/app/modelo/interfaces';
import { set, remove } from "local-storage"
import { Route } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable()
export class ApiServiceProvider {//implements HttpInterceptor

    private URL = "https://63e5f85a83c0e85a868a1df1.mockapi.io/api/who/users";
    private URLDjango = "http://172.25.9.217:8001";

    constructor(public http: HttpClient) { }

    authenticatedusuario() {
        return localStorage.getItem("user");
    }//end_auth

    getAllUser(): Observable<[]> {
        return this.http.get<any>(`${this.URL}`);
    }//end_all_user

    getUsuarioApiMock(user: Usuario) {
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
         .set('content-type', 'application/json; charset=utf-8')
        /* .set('Access-Control-Allow-Origin', 'always')*/
        /* .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')*/
         ;
                const body = {
            'username': user.username,
            'password': user.password
        }
        return this.http.post(this.URLDjango + "/api-auth/", body, {headers}).pipe(catchError(this.errorHandler))

      

    }//end_user_django

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || "server error.");
    };
    //https://stackoverflow.com/questions/48501513/set-jwt-token-in-header-in-angular-5-app
  
    /*What about deprecated - import HttpHeaders from the @angular/common/http. 
      If you need to add the JWT for each token, it will be better to use HttpInterceptor */
    findUser(paramToken: any) {
        const headers= new HttpHeaders()
          .set('content-type', 'application/json; charset=utf-8')
          .set('Authorization',  "Bearer "+ paramToken);
            
         return this.http.get(this.URLDjango + "/api-auth",{headers});
 
     }//end_user_django
 
}//end_class
