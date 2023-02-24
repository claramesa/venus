import { Component } from '@angular/core';
import { Categoria } from '../modelo/categoria';
import { Producto } from '../modelo/producto';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-inventario',
  templateUrl: './vista-inventario.component.html',
  styleUrls: ['./vista-inventario.component.css']
})
export class VistaInventarioComponent {
  productos: Producto[]=[];
  categorias: Categoria[]=[];
  filtro:string="";
  constructor(private apiService: ApiServiceProvider,private router:Router) {
    this.apiService.getProductos()
    .then((productos: Producto[]) => {
      this.productos= productos;
    })
    .catch((error: string) => {
      console.log(error);
    });
   
    this.apiService.getCategorias()
      .then((categorias: Categoria[]) => {
        this.categorias = categorias;
      console.log(this.categorias);
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

  public categoriaProductos(idCategoria:any){
    let id =idCategoria.target.value;
    if(id!=""){
     
      this.apiService.getProductosPorCategoria(parseInt(id))
      .then((productos: Producto[]) => {
        this.productos= productos;
        //console.log(productos);
        
      })
      .catch((error: string) => {
        console.log(error);
      });

    }
      
  }
}
