import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../../services/libro.service';
// import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-libro-detalle',
  templateUrl: './libro-detalle.component.html',
  styleUrls: ['./libro-detalle.component.css']
})
export class LibroDetalleComponent implements OnInit {
  pageTitle: string = 'Detalle del libro';
  errorMessage: string | undefined;
  libro: any;
  borrado: boolean = false;
  editando = false;
  editado = false;
  id: any;



  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _libroService: LibroService
  ) { }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      this.id = param;
      this.obtenerLibro(this.id);
    }
  }

  obtenerLibro(id: any) {
    this._libroService.obtenerLibro(id).subscribe(
      libro => this.libro = libro,
      error => this.errorMessage = <any>error);
  }

  borrarLibro() {
    this._libroService.borrar(this.id).subscribe(response => {
      this.borrado = true;
      setTimeout(() => { this._router.navigate(['/libros']); }, 1500);
      // this._router.navigate(['/libros']);
      return true;
    },
      error => {
        alert("hubo un error al tratar de borrar el libro");
        return false;
      })
  }

  editar(): boolean {
    if (this.editando === false) {
      this.editando = true;
      return false;
    }
    // console.log("valor editado", this.editado)
    // console.log("id", this.libro.id)

    this._libroService.editarLibro(this.libro, this.id).subscribe(response => {
      this.editado = true;
      setTimeout(() => { this._router.navigate(['/libros']); }, 1500);
      // this._router.navigate(['/libros']);
      return true;
    }, error => {
      alert("hubo un error al tratar de editar los detalles del libro");
      return false;
    });
    return false;
  }

  regresar(): void {
    this._router.navigate(['/libros']);
  }
  prestamo(): void {
    this._router.navigate(['/crearprestamo', this.libro._id]);
  }


}
