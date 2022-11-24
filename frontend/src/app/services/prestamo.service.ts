import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(private http: HttpClient) { }

  agregarPrestamo(prestamo: any): Observable<any> {
    return this.http.post(environment.monolitico + '/prestamo/nuevoPrestamo', prestamo);
  }

  obtenerClientes(): Observable<any> {
    return this.http.get(environment.monolitico + '/cliente/listarClientes')
      .pipe(tap(data => console.log('All: ' + data)))
  }

  obtenerPrestamos(): Observable<any> {
    return this.http.get(environment.monolitico + '/prestamo/listarPrestamos')
      .pipe(tap(data => console.log('All: ' + data)))
  }
  obtenerPrestamo(id: any): Observable<any> {
    return this.http.get(environment.monolitico + '/prestamo/buscarPrestamo/' + id)
      .pipe(tap(data => console.log('All: ' + data)))
  }

  editarPrestamo(prestamo: any, id: any): Observable<any> {
    // console.log("service recibe ", prestamo)
    return this.http.patch(environment.monolitico + '/prestamo/updatePrestamo/' + id, prestamo);
  }

}
