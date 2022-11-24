import { NoAuthGuard } from './../guards/noauth-guard.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [

    { path: 'login',
      canActivate: [ NoAuthGuard ],
      component: LoginComponent
    },
    { path: 'register',
      canActivate: [ NoAuthGuard ],
      component: RegisterComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRegistroRoutingModule { }
