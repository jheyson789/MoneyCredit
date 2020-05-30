import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-interes-dia',
  templateUrl: './interes-dia.component.html',
  styleUrls: ['./interes-dia.component.css']
})
export class InteresDiaComponent implements OnInit {

  calcuInteres: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formCalcularInteres();
  }

  formCalcularInteres() {
    this.calcuInteres = this.fb.group({
      monto: ['', Validators.required],
      interes: [3, Validators.required],
      seguro: [3.5, Validators.required],
      dias:['',Validators.required],
      fechaPrestado: ['']
    })
  }
  intereSeguro( ) {
    let monto = this.calcuInteres.value.monto;
    let interes = this.calcuInteres.value.interes;
    let seguro = this.calcuInteres.value.seguro;
    let dias = this.calcuInteres.value.dias;

    if ( dias <= 15) {
      let total = (monto*((interes+seguro)/100))/30;
      return total * 15;
      
    } else {
      let total = (monto*((interes+seguro)/100))/30;
      return total * dias;
    }
  }
  totalPagar() {
    let interes = this.intereSeguro();
    let monto = this.calcuInteres.value.monto;
    return monto + interes;
  }
  totalDias(fechaPres) {
    var fechaActual = moment();
    var fecha = moment(fechaPres);
    var diferencia = fechaActual.diff(fecha, 'days');
    // var fecha = new Date();
    // fecha.setDate(fecha.getDate() + 30);
    // return fecha;
    return diferencia;
  }
}
