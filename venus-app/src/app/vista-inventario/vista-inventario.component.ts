import { Component } from '@angular/core';
import { Categoria } from '../modelo/categoria';
import { Producto } from '../modelo/producto';
import { ApiServiceProvider } from '../providers/api-service/api-service';

@Component({
  selector: 'app-vista-inventario',
  templateUrl: './vista-inventario.component.html',
  styleUrls: ['./vista-inventario.component.css']
})
export class VistaInventarioComponent {
  productos: Producto[]=[];
  categorias: Categoria[]=[];
  constructor(private apiService: ApiServiceProvider) {
    this.apiService.getProductos()
    .then((productos: Producto[]) => {
      this.productos= productos;
    })
    .catch((error: string) => {
      console.log(error);
    });
    console.log(this.productos);
    this.apiService.getCategorias()
      .then((categorias: Categoria[]) => {
        this.categorias = categorias;
    //    console.log(this.categorias);
      })
      .catch((error: string) => {
        console.log(error);
      });
    /*
 this.apiService.getProductos()
      .then( (productos:Producto[])=> {
          this.productos=productos;
          console.log(this.productos);
      })
      .catch( (error:string) => {
          console.log(error);
      });
    */

  }

  public categoriaProductos(idCategoria:number){
      this.apiService.getProductosPorCategoria(this.categorias[idCategoria].id)
        .then((productos: Producto[]) => {
          this.productos= productos;
          console.log(productos);
        })
        .catch((error: string) => {
          console.log(error);
        });
  }
}
