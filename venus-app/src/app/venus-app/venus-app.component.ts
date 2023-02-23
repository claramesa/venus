import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venus-app',
  templateUrl: './venus-app.component.html',
  styleUrls: ['./venus-app.component.css']
})
export class VenusAppComponent {

  //lista contiene objetos (imagen, nombre, ruta(lugar de la app a acceder))
  listaAplicaciones = []

  constructor(private router: Router) { }

  navigateToVenus() {
    this.router.navigate(['/']);
  }


}
