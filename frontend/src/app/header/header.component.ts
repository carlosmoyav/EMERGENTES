import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageTitle: string = 'SGB';

  errorMessage: string | undefined;
  usuario_nombre: any = '';
  usuario:[]=[];
  admin:boolean=false;
//   usuario = {
//     usuario_id: '',
//     usuario_nombre: '',
//     usuario_apellido: '',
//     usuario_tipo: '',
//     biblioteca_id: '',
//     biblioteca_nombre: ''
//  };
  constructor(public router: Router,
    private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  cerrarsesion(){
    localStorage.clear();
    setTimeout(() => { this.router.navigate(['/login']); }, 500);
    // this.router.navigate(['/login']);
  }

  obtenerUsuario(){
    this.authenticationService.obtenerUsuario()
    .subscribe((data) => {
      this.usuario_nombre = data.nombre;
      this.usuario=data;
      if(data.tipo=='admin'){
        this.admin=true;
      }
      else{
        this.admin=false;
      }
    },
    error => this.errorMessage = <any>error);
  }
}
