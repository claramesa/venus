import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venus-app',
  templateUrl: './venus-app.component.html',
  styleUrls: ['./venus-app.component.css']
})
export class VenusAppComponent {

  //ajustar ruta con el nombre del componente a ir
  listaAplicaciones = [{
    "imagen": "../../assets/Inventory.png",
    "nombre": "Inventario",
    "ruta": '/inventario'
  }, {
    "imagen": "../../assets/ajustes.png",
    "nombre": "Ajustes",
    "ruta": "/ajustes"
  }]

  constructor() { }


}
