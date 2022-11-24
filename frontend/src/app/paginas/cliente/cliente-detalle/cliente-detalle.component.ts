import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent implements OnInit {
  pageTitle: string = 'Detalle del cliente';
  errorMessage: string | undefined;
  cliente: any;
  editando = false;
  editado = false;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    const param = this._route.snapshot.paramMap.get('id');
    if (param) {
      const id = param;
      this.obtenerCliente(id);
    }
  }

  obtenerCliente(id: any) {
    this.clienteService.obtenerCliente(id).subscribe(
      cliente => this.cliente = cliente,
      error => this.errorMessage = <any>error);
  }

  regresar(): void {
    this._router.navigate(['/clientes']);
  }


  editar(): boolean {
    if (this.editando === false) {
      this.editando = true;
      return false;
    }

    // console.log("valor editado", this.editado)
    // console.log("id", this.cliente.id)

    this.clienteService.editarCliente(this.cliente, this.cliente._id).subscribe(response => {
      this.editado = true;
      setTimeout(() => { this._router.navigate(['/clientes']); }, 1500);
      // this._router.navigate(['/libros']);
      return true;
    }, error => {
      alert("hubo un error al tratar de editar los detalles del Cliente");
      return false;
    });
    return false;
  }

}
