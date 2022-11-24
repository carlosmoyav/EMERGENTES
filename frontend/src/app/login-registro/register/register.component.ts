import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  nombres = new FormControl(null, [Validators.required]);
  apellidos = new FormControl(null, [Validators.required]);
  nombrebiblioteca = new FormControl(null, [Validators.required]);
  email = new FormControl(null, [Validators.required, Validators.email]);
  password = new FormControl(null, [Validators.required, Validators.minLength(10)]);
  hide = true;

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm.addControl('nombres', this.nombres);
    this.registerForm.addControl('apellidos', this.apellidos);
    this.registerForm.addControl('nombrebiblioteca', this.nombrebiblioteca);
    this.registerForm.addControl('email', this.email);
    this.registerForm.addControl('password', this.password);


  }
  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Ingrese un correo electrónico';
    }

    return this.email.hasError('email') ? 'No es un correo electrónico valido' : '';
  }
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Ingrese su contraseña';
    }
    return this.password.hasError('minLength') ? '' : 'La contraseña debe tener minimo 10 caracteres';
  }
  getErrorMessageNombres() {
    if (this.nombres.hasError('required')) {
      return 'Ingrese sus nombres';
    }
    return;
  }
  getErrorMessageApellidos() {
    if (this.apellidos.hasError('required')) {
      return 'Ingrese sus apellidos';
    }
    return;
  }
  getErrorMessageBiblioteca() {
    if (this.nombrebiblioteca.hasError('required')) {
      return 'Ingrese el nombre de su biblioteca';
    }
    return;
  }

  onSubmit() {
    console.log(this.password.invalid)
    if (this.registerForm.invalid) {
      console.log('no se registro')
      return;
    }
    console.log('se registro')
    //this.registerForm.value.nombres
    //this.registerForm.value.apellidos
    //this.registerForm.value.email

    this.authService.registro(this.registerForm.value.nombres, this.registerForm.value.apellidos, this.registerForm.value.nombrebiblioteca, this.registerForm.value.email, this.registerForm.value.password).subscribe(
      response => {
        this.router.navigate(['login'])
        // console.log(response.mensaje)
        return alert("Usuario creado con exito")
      },
      error => {
        this.router.navigate(['register'])
        // console.log(error.error.mensaje)
        return alert("Hubo un error al crear el usuario")
      }

    );

  }


}
