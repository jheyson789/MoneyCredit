import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  
  calcuJoyas: FormGroup;
  calcuInteres: FormGroup;
  calcuDias: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    this.formCalcularJoyas();
    this.formCalcularInteres();
  }

  formCalcularJoyas() {
    this.calcuJoyas = this.fb.group({
      peso : ['0', Validators.required],
      kilate: [, Validators.required]
    })
  }

  formCalcularInteres() {
    this.calcuInteres = this.fb.group({
      monto: ['', Validators.required],
      interes: [3, Validators.required],
      seguro: [3.5, Validators.required],
      dias:['',Validators.required]
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

  calcularNormal( peso: number, kilate: string ) {
    if ( peso < 10.1 ) {
      switch (kilate) {
        case '18':
          return peso * 170;
  
        case '14':
          return peso * 120;
        
        case '10':
          return peso * 85;
      
        default:
          return 0;
      }
    } else {
        switch (kilate) {
          case '18':
            return peso * 160;
    
          case '14':
            return peso * 135;
          
          case '10':
            return peso * 80;
        
          default:
            return 0;
        }
    }
  }
  calcularExt( peso: number, kilate: string ) {
    
    if ( peso < 10.1 ) {
      switch (kilate) {
        case '18':
          return peso * 0;
  
        case '14':
          return peso * 135;
        
        case '10':
          return peso * 0;
      
        default:
          return 0;
      }
    } else {
        switch (kilate) {
          case '18':
            return peso * 175;
    
          case '14':
            return peso * 150;
          
          case '10':
            return peso * 90;
        
          default:
            return 0;
        }
    }
  }

  

}