import { PrestamoService } from './../../../services/prestamo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from 'src/app/services/libro.service';
import { collectExternalReferences } from '@angular/compiler';


@Component({
  selector: 'app-prestamo-crear',
  templateUrl: './prestamo-crear.component.html',
  styleUrls: ['./prestamo-crear.component.css']
})
export class PrestamoCrearComponent implements OnInit {
  pageTitle: string = 'Prestamo del libro';
  clientes: any;
  errorMessage: string | undefined;
  fechaseleccionada: any | undefined;
  libro: any;
  creado = false;
  prestamo: any = {};
  ClienteIdSeleccionado: any;

  selection: any;


  agregado = false;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _libroService: LibroService,
    private prestamoService: PrestamoService) { }

  ngOnInit(): void {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.obtenerLibro(id);

    }
    this.enlistarClientes();

  }

  enlistarClientes() {
    this.prestamoService.obtenerClientes()
      .subscribe(clientes => {
        this.clientes = clientes;
        console.log(clientes);
        this.prestamo.cliente_id = "";
      },
        error => this.errorMessage = <any>error);
  }

  obtenerLibro(id: any) {
    this._libroService.obtenerLibro(id).subscribe(
      libro => this.libro = libro,
      error => this.errorMessage = <any>error);
  }

  agregarPrestamo() {
    // console.log("libro", this.libro);
    this.prestamo.cliente_id = this.ClienteIdSeleccionado;
    this.prestamo.libro_id = this.libro._id;
    this.prestamo.fecha_dev = "pendiente";
    // console.log(this.libro.usuario_id)
    console.log(this.prestamo)
    this.prestamoService.agregarPrestamo(this.prestamo)
      .subscribe(
        response => {
          this.agregado = true;
          alert("el prestamo ha sido generado");
          this._router.navigate(['/libros']);
        },
        error => {
          return alert("hubo un error al tratar de generar el prestamo");
        })
  }
  changeFn(val: any) {
    this.prestamo.cliente_id = val;
  }
}
