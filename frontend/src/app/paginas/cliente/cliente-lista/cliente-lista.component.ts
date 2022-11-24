import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {


  clienteForm: FormGroup = new FormGroup({});
  cliente_cedulaCampo: FormControl = new FormControl('', [Validators.required,
  Validators.pattern(/^[0-9]\d*$/), Validators.minLength(10), Validators.maxLength(10),]);
  cliente_nombresCampo: FormControl = new FormControl('', [Validators.required]);
  cliente_apellidosCampo: FormControl = new FormControl('', [Validators.required]);
  cliente_emailCampo: FormControl = new FormControl('', [Validators.required, Validators.email]);
  cliente_direccionCampo: FormControl = new FormControl('', [Validators.required]);

  loading = true;
  biblioteca_nombre: any = '';
  errorMessage: string | undefined;
  clientes: any[] = [];
  agregado = false;
  clientesFiltrados: any[] = [];

  _listFilter!: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.clientesFiltrados = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.clientes;
  }

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.clientes.filter((cliente: any) =>
      cliente.cedula.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  constructor(private clienteService: ClienteService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.clienteForm.addControl('cedula', this.cliente_cedulaCampo);
    this.clienteForm.addControl('nombre', this.cliente_nombresCampo);
    this.clienteForm.addControl('apellido', this.cliente_apellidosCampo);
    this.clienteForm.addControl('email', this.cliente_emailCampo);
    this.clienteForm.addControl('direccion', this.cliente_direccionCampo);
    this.obtenerUsuario();
    this.enlistarClientes();
  }

  enlistarClientes() {
    this.clienteService.obtenerClientes()
      .subscribe(clientes => {
        this.clientes = clientes;
        // console.log("Clientes ", this.clientes)
        this.clientesFiltrados = this.clientes;
        this.loading = false
      },
        error => this.errorMessage = <any>error);
  }

  obtenerUsuario() {
    this.authenticationService.obtenerUsuario()
      .subscribe((data) => {
        this.biblioteca_nombre = data.biblioteca_nombre;
      },
        error => this.errorMessage = <any>error);
  }

  agregarCliente() {
    console.log("cliente prueba", this.clienteForm.value);
    this.clienteService.agregarCliente(this.clienteForm.value)
      .subscribe(
        response => {
          this.agregado = true;
          alert("El cliente ha sido agregado");
          this.cliente_cedulaCampo.setValue('')
          this.cliente_nombresCampo.setValue('')
          this.cliente_apellidosCampo.setValue('')
          this.cliente_emailCampo.setValue('')
          this.cliente_direccionCampo.setValue('')
          this.enlistarClientes()
        },
        error => {
          return alert("hubo un error al tratar de agregar el cliente");
        })
  }
}
