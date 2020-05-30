import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  private url = 'http://localhost:4000/api';


  constructor(
    private _http : HttpClient
  ) { }

  crearPrestamo(formulario : any): Observable<any>{
    let params = JSON.stringify(formulario);
    const headers = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.post(`${this.url}/save-project`, params, {headers : headers});
  }
  guardarPrestamo(formulario: any): Observable<any> {
    let params = JSON.stringify(formulario);
    const headers = new HttpHeaders().set('content-Type', 'application/json');
    return this._http.post(`${this.url}/guardar-test`, params, {headers : headers});
  }
  getProjects(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'/mostrar-prestamos', {headers: headers});
  }
  mostrarPrestamo(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/mostrar-prestamo/'+id, {headers: headers});
  }
  mostrarPago(id: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/mostrar-pagos/'+id, {headers: headers});
  }
  eliminarPrestamo(id: String): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'/eliminar-prestamo/'+id, {headers: headers});
  }
  mostrarTest(id: String) : Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/mostrar-test/'+id, {headers: headers});
  }
  pagarPrestamo(formulario): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+'/pago-efectuado/'+formulario._id, formulario, {headers: headers});
  }
  eliminarPagos(id: String): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'/eliminar-pago/'+id, {headers: headers});
  }
}
