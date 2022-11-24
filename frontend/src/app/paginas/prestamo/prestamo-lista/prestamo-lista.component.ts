import { PrestamoService } from './../../../services/prestamo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prestamo-lista',
  templateUrl: './prestamo-lista.component.html',
  styleUrls: ['./prestamo-lista.component.css']
})
export class PrestamoListaComponent implements OnInit {
  seleccionado: string = '';

  pageTitle: string = 'Pestamos';

  errorMessage: string | undefined;

  _listFilter!: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.prestamosFiltrados = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.prestamos;
  }

  prestamosFiltrados: any[] = [];
  prestamos: any[] = [];
  loading = true;


  // prestamo = {
  //   nombre_libro:'',
  //   nombre_usuario:'',
  //   fecha_pres:'',
  //   fecha_est_dev:'',
  //   fecha_dev:'',
  //   estado:''
  // };

  constructor(private prestamoService: PrestamoService) { }

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.prestamos.filter((prestamo: any) =>
      prestamo.cliente.cedula.indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.enlistarPrestamos();
  }

  enlistarPrestamos() {
    this.prestamoService.obtenerPrestamos()
      .subscribe(prestamos => {
        this.prestamos = prestamos.prestamos;
        console.log("prestamos ", this.prestamos)
        this.prestamosFiltrados = this.prestamos;
        this.loading = false
      },
        error => this.errorMessage = <any>error);
  }

}
