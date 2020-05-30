import { Component, OnInit } from '@angular/core';
import { PrestamosService } from '../../services/prestamos.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [PrestamosService]
})
export class PagoComponent implements OnInit {

  public datos:any = [] ;
  public totalPagos: any = [] ;
  public forma: FormGroup;

  constructor(
    private servicioPrestamo: PrestamosService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.crearPago();
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params.id;
      this.mostrarPrestamoGral(id);
    })
  }

  mostrarPrestamoGral(id: any) {
    
    this.servicioPrestamo.mostrarTest(id).subscribe(
      prestamo => {
        this.datos = prestamo;
        // console.log(this.datos.pagos[0]);
        this.mostrarPagos(this.datos.pagos[0]);
      },
      error => {
        Swal.fire({
          icon:'error',
          title: 'Opops...',
          text: `Hubo un problema`
        })
      }
    )
  }
  mostrarPagos(id: any) {
    this.servicioPrestamo.mostrarPago(id).subscribe(
      pagos => {
        this.totalPagos = pagos;
        console.log(this.totalPagos.pagos.length);
        
      },
      error => {
        Swal.fire({
          icon:'error',
          title: 'Opops...',
          text: `Hubo un problema`
        })
      }
    )
  }
  
  crearPago() {
    this.forma = this.fb.group({
      fechaPago: ['', Validators.required],
      saldoAnterior: ['', Validators.required],
      interes: ['', Validators.required],
      pago: ['', Validators.required],
      saldoTotal: ['', Validators.required]
    })
  }
  
  guardarPago(){
    const nuevo = this.totalPagos.pagos as FormArray;
    nuevo.push(this.forma.value);
    console.log(this.totalPagos);
    this.servicioPrestamo.pagarPrestamo(this.totalPagos).subscribe(
      resp => {
        Swal.fire({
          title: 'Pago Correcto',
          text: 'Se guardo correctamente',
          icon: 'success'
        });
      },
      error => {
        Swal.fire({
          title:'Error',
          text: 'Error en la conexión de la base de datos',
          icon:'error'
        })
      }
    )
  }

}
