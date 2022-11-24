import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  pageTitle: string = 'Detalle del cliente';
  errorMessage: string | undefined;
  editando = false;
  editado = false;
  usuario: any;
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.obtenerUsuario(id);
    }
  }

  obtenerUsuario(id: any) {
    this.usuarioService.buscarUsuario(id).subscribe(
      usuario => this.usuario = usuario,
      error => this.errorMessage = <any>error);
  }

  regresar(): void {
    this._router.navigate(['/usuarios']);
  }


  editar(): boolean {
    if (this.editando === false) {
      this.editando = true;
      return false;
    }

    this.usuarioService.editarUsuario(this.usuario).subscribe(response => {
      this.editado = true;
      setTimeout(() => { this._router.navigate(['/usuarios']); }, 1500);
      // this._router.navigate(['/libros']);
      return true;
    }, error => {
      alert("Hubo un error al tratar de editar los detalles del Usuario");
      return false;
    });
    return false;
  }

  deshabilitar() {
    this.usuario.estado = 'false';
    this.usuarioService.deshabilitar(this.usuario).subscribe(response => {
      // console.log(this.usuario);
      return true;
    }, error => {
      alert("Hubo un error al tratar de deshabilitar el Usuario");
      return false;
    });
    return false;
  }

  habilitar() {
    this.usuario.estado = 'true';
    this.usuarioService.deshabilitar(this.usuario).subscribe(response => {
      // console.log(this.usuario);
      return true;
    }, error => {
      alert("Hubo un error al tratar de habilitar el Usuario");
      return false;
    });
    return false;

  }
}
