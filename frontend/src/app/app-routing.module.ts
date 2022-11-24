import { PaginasRoutingModule } from './paginas/paginas-routing';
import { LoginRegistroRoutingModule } from './login-registro/login-registro-routing';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
}),
    LoginRegistroRoutingModule,
    PaginasRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
