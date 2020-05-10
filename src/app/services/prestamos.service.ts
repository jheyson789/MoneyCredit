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
  getProjects(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'/mostrar-prestamos', {headers: headers});
  }
  mostrarPrestamo(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'/mostrar-prestamo/'+id, {headers: headers});
  }
  eliminarPrestamo(id: String): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'/eliminar-prestamo/'+id, {headers: headers});
  }

}
