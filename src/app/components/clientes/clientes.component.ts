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
    this.genPdf = true;
    console.log(this.forma.value);
    console.log(this.servicioPrestamo.crearPrestamo(this.forma.value));
    Swal.fire({
      title:'Espere',
      text: 'Guardando información',
      icon: 'info',
      timer: 2000,
      timerProgressBar: true,
      allowOutsideClick: false
    });

    this.servicioPrestamo.crearPrestamo(this.forma.value).subscribe(
      resp => {
        Swal.fire({
          title: this.forma.value.nombre,
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
    const quitar = this.forma.value.prendas;
    quitar.pop();
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
  
   

  
  generarPdf() {
    // let DATA = this.pruebapdf.nativeElement;
    // let doc = new jsPDF('p','pt', 'a5');
    // doc.fromHTML(DATA.innerHTML,15,15);
    // doc.output('dataurlnewwindow')
    
  }
  abrirPDF(){
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




}
