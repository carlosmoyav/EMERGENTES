import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient) { }

  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post(environment.user + '/crearOperador', usuario);
  }

  obtenerUsuarios(): Observable<any> {
    return this.http.get(environment.user + '/listarUsuarios')
      .pipe(tap(data => console.log('All: ' + data)))
  }
  buscarUsuario(id: any): Observable<any> {
    return this.http.get(environment.user + '/buscarUsuario/' + id)
      .pipe(tap(data => console.log('All: ' + data)))
  }
  editarUsuario(usuario: any): Observable<any> {
    // console.log("service recibe ", usuario)
    return this.http.patch(environment.user + '/editarUsuario', usuario);
  }

  deshabilitar(usuario: any): Observable<any> {
    // console.log("service recibe ", usuario)
    return this.http.patch(environment.user + '/deshabilitar', usuario);
  }

}
