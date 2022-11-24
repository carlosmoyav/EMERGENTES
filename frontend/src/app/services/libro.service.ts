import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor(private http: HttpClient) { }

  obtenerLibros(): Observable<any> {
    return this.http.get(environment.monolitico + '/libro/listarLibros')
      .pipe(tap(data => console.log('All: ' + data)))
  }

  obtenerAutores(): Observable<any> {
    return this.http.get(environment.monolitico + '/libro/autores')
      .pipe(tap(data => console.log('All: ' + data)))
  }

  borrar(id: any): Observable<any> {
    return this.http.delete(environment.monolitico + '/libro/deleteLibro/' + id);
  }

  agregarLibro(libro: any): Observable<any> {
    return this.http.post(environment.monolitico + '/libro/nuevoLibro', libro);
  }

  editarLibro(libro: any, id: any): Observable<any> {
    // console.log("service recibe ", libro)
    return this.http.patch(environment.monolitico + '/libro/updateLibro/' + id, libro);
  }

  obtenerLibro(id: any): Observable<any> {
    return this.http.get(environment.monolitico + '/libro/buscarLibro/' + id).pipe(tap(data => console.log('All: ' + data)))
  }

}
