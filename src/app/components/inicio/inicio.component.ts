import { Component, OnInit } from '@angular/core';
import { PrestamosService } from '../../services/prestamos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[PrestamosService]
})
export class InicioComponent implements OnInit {

  public datos;

  constructor(
    private servicioPrestamo : PrestamosService
  ) { }

  ngOnInit(): void {
    this.mostrarPrestamos();
  }

  mostrarPrestamos() {

    this.servicioPrestamo.getProjects().subscribe(
      response => {
        if(response.prestamos) {
          this.datos = response.prestamos;
        }
      },
      error => {
        
      }

    )

  }


}
