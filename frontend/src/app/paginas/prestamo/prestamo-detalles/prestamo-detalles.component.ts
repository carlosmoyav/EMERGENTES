
import { PrestamoService } from './../../../services/prestamo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from 'src/app/services/libro.service';
import * as moment from 'moment';

@Component({
  selector: 'app-prestamo-detalles',
  templateUrl: './prestamo-detalles.component.html',
  styleUrls: ['./prestamo-detalles.component.css']
})
export class PrestamoDetallesComponent implements OnInit {

  pageTitle: string = 'Detalle del Prestamo';
  errorMessage: string | undefined;
  borrado: boolean = false;
  editando = false;
  editado = false;
  prestamo: any;
  fecha_devolucion: string = '';
  id: any;
  // prestamodetalles: any[] = [];
  // prestamo = {
  //   cliente_nombre: '',
  //   cliente_apellido: '',
  //   cliente_cedula: '',
  //   libro_nombre: '',
  //   libro_ref: '',
  //   prestamo_id: 1,
  //   prestamo_fecha: '',
  //   prestamo_fecha_dev_est: '',
  //   prestamo_fecha_dev: '',
  //   prestamo_estado: ''
  // };



  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _libroService: LibroService,
    private prestamoService: PrestamoService
  ) {

  }

  ngOnInit() {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      this.id = param;
      this.obtenerPrestamo(this.id);
      // this.obtenerPrestado();


    }
  }


  obtenerPrestamo(id: any) {
    // this.obtenerfecha();
    this.prestamoService.obtenerPrestamo(id).subscribe(
      prestamo => this.prestamo = prestamo,
      error => this.errorMessage = <any>error);
  }



  editar(): boolean {
    if (this.editando === false) {
      this.editando = true;
      return false;
    }

    // console.log("valor editado", this.editado)
    // console.log("id", this.prestamo.prestamo_id)
    this.prestamo.prestamo.fecha_dev = this.fecha_devolucion;
    this.prestamoService.editarPrestamo(this.prestamo, this.id).subscribe(response => {
      this.editado = true;
      this.editando = true;
      this._router.navigate(['/prestamos']);
      return true;
    }, error => {
      alert("Hubo un error al tratar de editar los detalles del prestamo (Ingrese una fecha de devolución)");
      this._router.navigate(['/prestamo:id']);
      return false;
    });
    return false;

  }

  regresar(): void {
    this._router.navigate(['/prestamos']);
  }


}
