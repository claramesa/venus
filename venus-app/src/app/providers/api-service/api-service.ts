import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from 'src/app/modelo/categoria';
import { Producto } from 'src/app/modelo/producto';


@Injectable()
export class ApiServiceProvider {

    private URL = "http://localhost:8000";

    constructor(public http: HttpClient) {
    }

    getCategorias(): Promise<Categoria[]> {
        let promise = new Promise<Categoria[]>((resolve, reject) => {
            this.http.get(this.URL + "/categorias/").toPromise()
                .then((data: any) => {
                    data = data.map((c: Categoria) => {return c});
                    resolve(data);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getCategorias
    
    getProductos(): Promise<Producto[]> {
        let promise = new Promise<Producto[]>((resolve, reject) => {
            this.http.get(this.URL + "/productos/").toPromise()
                .then((data: any) => {
                    data = data.map((p: Producto) => {return p});
                    resolve(data);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getProductos

    getProductosPorCategoria(idCategoria:number): Promise<Producto[]> {
        let promise = new Promise<Producto[]>((resolve, reject) => {
            this.http.get(this.URL + "/productosc/"+idCategoria).toPromise()
                .then((data: any) => {
                    let productos = new Array<Producto>();
                    data.forEach((producto: Producto) => {
                        console.log(producto);
                        productos.push(producto);
                    });
                    resolve(productos);
                })
                .catch((error: Error) => {
                    reject(error.message);
                });
        });
        return promise;
    }//end_getProductosPorCategoria

/*
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
    }//end_insertarAlumno*/

}//end_class