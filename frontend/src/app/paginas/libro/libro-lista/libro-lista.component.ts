
import { Component, OnInit } from '@angular/core';

import { LibroService } from '../../../services/libro.service';
import { NgModule } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-libro-lista',
  templateUrl: './libro-lista.component.html',
  styleUrls: ['./libro-lista.component.css']
})
export class LibroListaComponent implements OnInit {
  autores: any[] = [];
  seleccionado: string = '';

  errorMessage: string | undefined;

  _listFilter!: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.librosFiltrados = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.libros;
  }

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.libros.filter((libro: any) =>
      libro.nombre.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  librosFiltrados: any[] = [];
  libros: any[] = [];
  biblioteca_id: any = '';
  biblioteca_nombre: any = '';
  loading = true;
  // bibliotecaid:any='';

  libro = {
    nombre: '',
    autor: '',
    ref: '',
    isbn: '',
  };

  //  usuario = {
  //     usuario_id: '',
  //     usuario_nombre: '',
  //     usuario_apellido: '',
  //     usuario_tipo: '',
  //     biblioteca_id: '',
  //     biblioteca_nombre: ''
  //  };

  //  usuario: []= {
  //   usuario_id: '',
  //   usuario_nombre: '',
  //   usuario_apellido: '',
  //   usuario_tipo: '',
  //   biblioteca_id: '',
  //   biblioteca_nombre: ''
  //  };

  agregado = false;
  constructor(private _libroService: LibroService,
    private authenticationService: AuthenticationService) { }



  ngOnInit(): void {
    this.enlistarLibros();
    // this.enlistarAutores();
    this.obtenerUsuario();

  }

  // enlistarAutores(){
  //   this._libroService.obtenerAutores()
  //   .subscribe(autores => {
  //     this.autores = autores;
  //   },
  //   error => this.errorMessage = <any>error);
  // }
  enlistarLibros() {
    this._libroService.obtenerLibros()
      .subscribe(libros => {
        this.libros = libros;
        // console.log("libros ", this.libros)
        this.librosFiltrados = this.libros;
        this.loading = false
        console.log(libros)
      },
        error => this.errorMessage = <any>error);
  }

  obtenerUsuario() {
    this.authenticationService.obtenerUsuario()
      .subscribe((data) => {
        this.biblioteca_id = data.biblioteca_id;
        this.biblioteca_nombre = data.biblioteca_nombre;
      },
        error => this.errorMessage = <any>error);
  }

  agregarLibro() {
    // console.log(this.biblioteca_id);
    // console.log("libro", this.libro);
    this._libroService.agregarLibro(this.libro)
      .subscribe(
        response => {
          this.agregado = true;
          alert("el libro ha sido agregado");
          this.libro = {
            nombre: '',
            autor: '',
            ref: '',
            isbn: '',
          };

          this._libroService.obtenerLibros()
            .subscribe(libros => {
              this.libros = libros;
              // console.log("libros ", this.libros)
              this.librosFiltrados = this.libros;
            },
              error => this.errorMessage = <any>error);

        },
        error => {
          return alert("hubo un error al tratar de agregar el libro");
        })
  }

}
