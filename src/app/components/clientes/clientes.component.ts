import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

// import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import { PrestamosService } from '../../services/prestamos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers:[PrestamosService]
})
export class ClientesComponent implements OnInit {
  @ViewChild('pruebapdf') pruebapdf: ElementRef;
  @ViewChild('codigoCliente',{ static: false }) codigoCliente: ElementRef;
 
  genPdf = false;
  formData;
  forma: FormGroup;
  fechaA = new Date();
  public prestamos;
  
  constructor(
    private fb: FormBuilder,
    private servicioPrestamo: PrestamosService
  ) {
    this.crearFormulario();
   }

  ngOnInit(): void {
    this.getPrestamos();
  }

  getPrestamos(){
    this.servicioPrestamo.getProjects().subscribe(
      response => {
        if(response.prestamos){
          this.prestamos = response.prestamos;
        }
      },
      error => {

      }
    )
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['',Validators.required],
      carnetIdentidad: ['',Validators.required],
      extension: [''],
      telefono: [''],
      celular:[''],
      codigoCliente:[this.generarCodigo(6),Validators.required],
      codigoContrato:[this.generarCodigo(8),Validators.required],
      capital:['',Validators.required],
      interes:['3',Validators.required],
      seguro:['3.5',Validators.required],
      fechaActual:[this.fechaA,Validators.required],
      fechaVencimiento:[this.restar(), Validators.required],
      prendas: this.fb.array([])
    });
  }
  restar() {
    var fecha = new Date();
    fecha.setDate(fecha.getDate() + 30);
    return fecha;
  }

  get prendas() {
    return this.forma.get('prendas') as FormArray;
  }
  guardar(){
    // this.forma.value.codigoCliente = cod;
    console.log(this.forma.invalid);

    Swal.fire({
      title:'Espere',
      text: 'Guardando información',
      icon: 'info',
      timer: 2000,
      timerProgressBar: true,
      allowOutsideClick: false
    });
    Swal.showLoading();
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
      });  
    }

    // this.servicioPrestamo.crearPrestamo(this.forma.value).subscribe(
    this.servicioPrestamo.guardarPrestamo(this.forma.value).subscribe(
      resp => {
        Swal.fire({
          title: this.forma.value.nombre,
          text: 'Se guardo correctamente',
          icon: 'success'
        });
        this.genPdf = true;
      },
      error => {
        Swal.fire({
          title:'Error',
          text: 'Error en la conexión de la base de datos',
          icon:'error'
        })
      }
    );

  }
  agregarPrenda() {
    const nuevo = this.forma.controls.prendas as FormArray;
    nuevo.push(this.fb.group({
      descripcion:[],
      kilate: [],
      peso: [],
      observacion: []
    }));
  }

  quitarPrenda(i: number) {
    this.prendas.removeAt(i);
  }

  generarCodigo(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
  
   

  
 
  generarPdf(){
    const options = {
      margin: 2,
      filename: `${this.forma.value.carnetIdentidad}.pdf`,
      image: { type: 'jpeg', quality: 0.99},
      html2canvas: {},
      jsPDF: {orientation: 'portrait', format: 'letter'}
    };
    const content : Element = document.getElementById('pruebapdf');

    html2pdf()
      .from(content)
      .set(options)
      .output('dataurlnewwindow');
    
  }
  resetear() {
    window.location.reload();
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }
  get carnetInvalido() {
    return this.forma.get('carnetIdentidad').invalid && this.forma.get('carnetIdentidad').touched
  }
  get capitalInvalido() {
    return this.forma.get('capital').invalid && this.forma.get('capital').touched
  }
  get interesInvalido() {
    return this.forma.get('interes').invalid && this.forma.get('interes').touched
  }
  get seguroInvalido() {
    return this.forma.get('seguro').invalid && this.forma.get('seguro').touched
  }
  get codigoCliInvalido() {
    return this.forma.get('codigoCliente').invalid && this.forma.get('codigoCliente').touched
  }
  get codigoConInvalido() {
    return this.forma.get('codigoContrato').invalid && this.forma.get('codigoContrato').touched
  }




}
