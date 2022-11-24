import { ClienteListaComponent } from './cliente/cliente-lista/cliente-lista.component';
import { PrestamoDetallesComponent } from './prestamo/prestamo-detalles/prestamo-detalles.component';
import { PrestamoListaComponent } from './prestamo/prestamo-lista/prestamo-lista.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LibroListaComponent } from './libro/libro-lista/libro-lista.component';
import { LibroDetalleComponent} from './libro/libro-detalle/libro-detalle.component';
import { LibroGuardService } from '../guards/libro-guard.service';
import { HeaderComponent } from '../header/header.component';
import { PrestamoCrearComponent } from './prestamo/prestamo-crear/prestamo-crear.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { ClienteDetalleComponent } from './cliente/cliente-detalle/cliente-detalle.component';
import { UsuarioDetalleComponent } from './usuario/usuario-detalle/usuario-detalle.component';
import { UsuarioListaComponent } from './usuario/usuario-lista/usuario-lista.component';


const routes: Routes = [{

  path: '', component: HeaderComponent,
  canActivate: [ AuthGuard ],
        children:[
          {
            path: 'libros',
            component: LibroListaComponent
          },
          {
            path: 'libro/:id',
            canActivate: [ LibroGuardService ],
            component: LibroDetalleComponent
          },
          {
            path: 'crearprestamo/:id',
            component: PrestamoCrearComponent
          },
          {
            path: 'prestamos',
            component: PrestamoListaComponent
          },
          {
            path: 'prestamo/:id',
            component: PrestamoDetallesComponent
          },
          {
            path: 'clientes',
            component: ClienteListaComponent
          },
          {
            path: 'cliente/:id',
            component: ClienteDetalleComponent
          },
          {
            path: 'usuarios',
            component: UsuarioListaComponent
          },
          {
            path: 'usuario/:id',
            component: UsuarioDetalleComponent
          },

          { path: '',
          redirectTo: '/libros',
          pathMatch: 'full' },

  ]
}




];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaginasRoutingModule { }
