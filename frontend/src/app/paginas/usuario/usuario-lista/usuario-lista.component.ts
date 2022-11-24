import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {
  loading = true;
  biblioteca_id: any = '';
  errorMessage: string | undefined;
  usuarios: any[] = [];
  agregado = false;
  usuariosFiltrados: any[] = [];
  title = 'Usuarios'

  usuarioForm: FormGroup = new FormGroup({});
  usuario_nombresCampo: FormControl = new FormControl('', [Validators.required]);
  usuario_apellidosCampo: FormControl = new FormControl('', [Validators.required]);
  usuario_emailCampo: FormControl = new FormControl('', [Validators.required, Validators.email]);
  usuario_contrasenaCampo: FormControl = new FormControl('', [Validators.required]);

  hide = true;

  _listFilter!: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.usuariosFiltrados = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.usuarios;
  }

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.usuarios.filter((usuario: any) =>
      usuario.email.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  usuario: any;

  constructor(private usuarioService: UsuarioService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.usuarioForm.addControl('nombre', this.usuario_nombresCampo);
    this.usuarioForm.addControl('apellido', this.usuario_apellidosCampo);
    this.usuarioForm.addControl('email', this.usuario_emailCampo);
    this.usuarioForm.addControl('contrasena', this.usuario_contrasenaCampo);
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios()
      .subscribe(usuarios => {
        this.usuarios = usuarios.usuarios;
        // console.log("usuarios ", this.usuarios)
        this.usuariosFiltrados = this.usuarios;
        this.loading = false
      },
        error => this.errorMessage = <any>error);
  }


  agregarUsuario() {
    // console.log("usuario", this.usuario);
    console.log(this.usuarioForm.value)
    this.usuarioService.agregarUsuario(this.usuarioForm.value)
      .subscribe(
        response => {
          this.agregado = true;
          alert("El usuario ha sido agregado");
          this.usuario_nombresCampo.setValue('')
          this.usuario_apellidosCampo.setValue('')
          this.usuario_emailCampo.setValue('')
          this.usuario_contrasenaCampo.setValue('')
          this.obtenerUsuarios();
        },
        error => {
          return alert("hubo un error al tratar de agregar el usuario");
        })
  }
}
