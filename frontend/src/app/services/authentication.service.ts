import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(environment.user + '/login', {
        email: email,
        password: password,
      })
      .pipe(
        map((datos: any) => {
          localStorage.setItem('token', datos.token);
        })
      );
  }

  registro(
    nombres: string,
    apellidos: string,
    nombre_biblioteca: string,
    email: string,
    password: string
  ) {
    console.log('entro al registro');
    return this.http.post<any>(environment.user + '/crearAdmin', {
      nombres: nombres,
      apellidos: apellidos,
      nombre_biblioteca: nombre_biblioteca,
      email: email,
      password: password,
    });
  }

  obtenerUsuario(): Observable<any> {
    return this.http
      .get(environment.user + '/obtenerUsuario')
      .pipe(tap((data) => console.log('All: ' + data)));
  }
}
