
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login-registro/login/login.component';
import { RegisterComponent } from "./login-registro/register/register.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav';
import { LibroDetalleComponent } from './paginas/libro/libro-detalle/libro-detalle.component';
import { LibroListaComponent } from './paginas/libro/libro-lista/libro-lista.component';
import { NgSelect2Module } from 'ng-select2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { PrestamoCrearComponent } from './paginas/prestamo/prestamo-crear/prestamo-crear.component';
import { PrestamoDetallesComponent } from './paginas/prestamo/prestamo-detalles/prestamo-detalles.component';
import { PrestamoListaComponent } from './paginas/prestamo/prestamo-lista/prestamo-lista.component';
// import { NgDatepickerModule } from 'ng2-datepicker';
import { DpDatePickerModule } from 'ng2-date-picker';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ClienteDetalleComponent } from './paginas/cliente/cliente-detalle/cliente-detalle.component';
import { ClienteListaComponent } from './paginas/cliente/cliente-lista/cliente-lista.component';
import { UsuarioListaComponent } from './paginas/usuario/usuario-lista/usuario-lista.component';
import { UsuarioDetalleComponent } from './paginas/usuario/usuario-detalle/usuario-detalle.component';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


export function tokenGetter() {
  return localStorage.getItem('token');
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LibroDetalleComponent,
    LibroListaComponent,
    HeaderComponent,
    PrestamoCrearComponent,
    PrestamoDetallesComponent,
    PrestamoListaComponent,
    ClienteDetalleComponent,
    ClienteListaComponent,
    UsuarioListaComponent,
    UsuarioDetalleComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    NgSelect2Module,
    NgbModule,
    DpDatePickerModule,
    MatIconModule,
    NgSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["35.239.225.238:8088", '*'],
        disallowedRoutes: [""],
      },
    }),
    // NgDatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
