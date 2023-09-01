import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'; 
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  username: string = '';
  password: string = '';

  constructor(private authService: UsuarioService, private router: Router, private fb: FormBuilder,
    private toastr: ToastrService) {

  }

  loginForm : FormGroup= this.fb.group({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      (result) => {
        // El servidor ha respondido, aquí puedes verificar la respuesta
        if (result.success) {
          // Redireccionar a la página deseada
          this.router.navigate(['/prueba-ruta']);
          
          // Mostrar alerta de éxito
          this.toastr.success('¡Inicio de sesión exitoso!', 'Bienvenido');
        }
      },
      (error) => {
        // Error de comunicación con el servidor
        console.error(error);
        // Error de autenticación (usuario o contraseña incorrectos)
        if (error.error.message === 'El usuario no existe') {
          this.toastr.error('El usuario no existe', 'Error de autenticación');
        } 
      }
    );
  }
}