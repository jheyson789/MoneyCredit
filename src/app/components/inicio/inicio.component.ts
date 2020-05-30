import { Component, OnInit } from '@angular/core';
import { PrestamosService } from '../../services/prestamos.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers:[PrestamosService]
})
export class InicioComponent implements OnInit {

  public datos = [];
  public estado = false;
  public eliminar = false;
  public test = [];

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
          console.log(this.datos);
        }
        
        if( this.datos.length === 0 ) {
          Swal.fire({
            icon:'info',
            title: 'No hay Prestamos',
            text: `No existen Prestamos en la base de Datos`
          })
        }
      },
      error => {
        Swal.fire({
          icon:'error',
          title: 'Opops...',
          text: `No se pudo conectar a la base de datos`
        })
      }

    )

  }

  eliminarPrestamo(id: String, i: number, idPago: String) {
    Swal.fire({
      title: '¿Estas Seguro?',
      text: `Estas seguro que desea eliminar de los prestamos`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if(resp.value){
      this.datos.splice(i,1);
      this.servicioPrestamo.eliminarPrestamo(id).subscribe(
        prestamo=> {
          Swal.fire(
            'Se elimino Correctamente',
            'Que tengas un buen día',
            'success'
          )
          this.eliminar = true;
        },
        error => {
          Swal.fire({
            icon:'error',
            title: 'Opops...',
            text: `No se encontro el id ${id}`
          })
        }
      );
      this.servicioPrestamo.eliminarPagos(idPago).subscribe();
      }
    })

  }
  expiro(fechaPres: any){
    var fechaActual = moment();
    var fecha = moment(fechaPres);
    var diferencia = fechaActual.diff(fecha, 'days');
    if(diferencia >= 0) return true;
    if(diferencia < 0) return false;
  }


}
