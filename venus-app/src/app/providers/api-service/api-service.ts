import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from 'src/app/modelo/Alumno';

@Injectable()
export class ApiServiceProvider {

    private URL = "http://localhost:8000";

    constructor(public http: HttpClient) {
    }

    getAlumnos(): Promise<Alumno[]> {
        let promise = new Promise<Alumno[]>((resolve, reject) => {
            this.http.get(this.URL + "/alumnos").toPromise()
                .then((data: any) => {
                    let alumnos = new Array<Alumno>();
                    data.forEach((alumno: Alumno) => {
                        console.log(alumno);
                        alumnos.push(alumno);
                    });
                    resolve(alumnos);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getAlumnos


    eliminarAlumno(id: number): Promise<Boolean> {
        let promise = new Promise<Boolean>((resolve, reject) => {
            this.http.delete(this.URL + "/alumnos/" + id).toPromise().then(
                (data: any) => { // Success
                    console.log(data)
                    resolve(true);
                }
            )
                .catch((error: Error) => {
                    console.log(error.message);
                    reject(error.message);
                });
        });
        return promise;
    }//end_eliminar_alumno

    modificarAlumno(nuevosDatosAlumno: Alumno): Promise<Alumno> {
        let promise = new Promise<Alumno>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            let datos = JSON.stringify(nuevosDatosAlumno);
            this.http.put(this.URL + "/alumnos/" + nuevosDatosAlumno.id,
                datos,
                header).toPromise().then(
                    (data: any) => { // Success
                        let alumno: Alumno;
                        alumno = data;
                        resolve(alumno);
                    }
                )
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_modificar_alumno

    insertarAlumno(datosNuevoAlumno: Alumno): Promise<Alumno> {
        let promise = new Promise<Alumno>((resolve, reject) => {
            var header = { "headers": { "Content-Type": "application/json" } };
            delete datosNuevoAlumno.id; //cuando se hace un post no paso el id. El id es asignado por el servidor. Quito el atributo del objeto json
            let datos = JSON.stringify(datosNuevoAlumno);
            this.http.post(this.URL + "/alumnos/",
               datos,
                header).toPromise().then(
                    (data: any) => { // Success
                        let alumno: Alumno;
                        alumno = data;
                        resolve(alumno);
                    }
                )
                .catch((error: Error) => {
                   reject(error.message);
                });
        });
        return promise;
    }//end_insertarAlumno

}//end_class