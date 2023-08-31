import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usuario = "knpaute"
  contrasena = "123456"

  hide: boolean = false;

  
  constructor( private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    
  }

  loginForm : FormGroup= this.fb.group({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);

    const userControl = this.loginForm.get('user');
    const passwordControl = this.loginForm.get('password');
  
    if (userControl && passwordControl) {
      const user = userControl.value;
      const password = passwordControl.value;
  
      // Verificar las credenciales ingresadas con los valores definidos
      if (user === this.usuario && password === this.contrasena) {
        // Credenciales válidas, redireccionar a la página principal (prueba-ruta)
        this.router.navigate(['/prueba-ruta']);
      } else {
        // Credenciales inválidas, mostrar mensaje de error o realizar alguna acción adicional
        alert('Credenciales inválidas');
      }
  }


}
}