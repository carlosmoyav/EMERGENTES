import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  email = new FormControl(null, [Validators.required, Validators.email]);
  password = new FormControl(null,[Validators.required]);
  hide = true;

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    this.loginForm.addControl('email', this.email);
    this.loginForm.addControl('password', this.password);
  }
  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Ingrese un correo electrónico';
    }

    return this.email.hasError('email') ? 'No es un correo electrónico valido' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return'Ingrese su contraseña';
    }
    return
   }

   onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.email.value,this.password.value).subscribe(response =>{
      this.router.navigate(['libros'])
    },
    error =>{
      // this.router.navigate(['login'])
      // console.log(error.error.mensaje)
      return alert(error.error.mensaje)
    });

   }




}
