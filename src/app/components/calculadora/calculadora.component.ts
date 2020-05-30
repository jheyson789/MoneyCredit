import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  
  calcuJoyas: FormGroup;
  calcuDias: FormGroup;
  

  constructor(
    private fb: FormBuilder
  ) { 
    
  }

  ngOnInit(): void {
    this.formCalcularJoyas();
    
  }

  formCalcularJoyas() {
    this.calcuJoyas = this.fb.group({
      peso : ['0', Validators.required],
      kilate: [, Validators.required]
    })
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