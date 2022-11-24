import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  constructor(private http: HttpClient) { }

  agregarCliente(cliente: any): Observable<any> {
    return this.http.post(environment.monolitico + '/cliente/nuevoCliente', cliente);
  }

  obtenerClientes(): Observable<any> {
    return this.http.get(environment.monolitico + '/cliente/listarClientes')
      .pipe(tap(data => console.log('All: ' + data)))
  }
  obtenerCliente(id: any): Observable<any> {
    return this.http.get(environment.monolitico + '/cliente/buscarCliente/' + id)
      .pipe(tap(data => console.log('All: ' + data)))
  }
  editarCliente(cliente: any, id: any): Observable<any> {
    // console.log("service recibe ", cliente)
    return this.http.patch(environment.monolitico + '/cliente/updateCliente/' + id, cliente);
  }
}
