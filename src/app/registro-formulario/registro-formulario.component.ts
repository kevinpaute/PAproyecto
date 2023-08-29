import { Component, Renderer2 } from '@angular/core';
import { MessageService } from '../services/message.service';
import { NgForm } from '@angular/forms';

declare var grecaptcha: any;

@Component({
  selector: 'app-registro-formulario',
  templateUrl: './registro-formulario.component.html',
  styleUrls: ['./registro-formulario.component.css']
})
export class RegistroFormularioComponent {
  studentForm: NgForm;
  cedula: string;
  selectedGender: string;
  estado = 'esperando';
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
  genero: string;
  vehiculoarentar: string;




  constructor(public _MessageService: MessageService, private renderer: Renderer2) {
    this.studentForm = new NgForm([], []);
  }

  filterNumeric(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
  }

  async verifyRecaptcha(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const script = this.renderer.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=6LciqHQmAAAAAAFXMqP_hkbI1LAbIH8boA-PgUw1`;
        document.body.appendChild(script);
        script.onload = () => {
          grecaptcha.ready(async () => {
            try {
              const token = await grecaptcha.execute('6LciqHQmAAAAAAFXMqP_hkbI1LAbIH8boA-PgUw1', { action: 'submit' });
              resolve(token !== '');
            } catch (error) {
              reject(error);
            }
          });
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  async contactForm(form: any) {
    const isVerified = await this.verifyRecaptcha();
    if (isVerified) {
      if (this.validateForm(form)) {
        this._MessageService.sendMessage(form).subscribe(() => {
          // Lógica adicional después de enviar el mensaje
        });
      }
    } else {
      // Mostrar mensaje de error o realizar alguna acción en caso de verificación fallida
    }
  }

  validateForm(form: any): boolean {
    let isValid = true;

    if (form.nombres.length > 100) {
      isValid = false;
      // Mostrar mensaje de error para el campo de nombres
    }

    if (form.apellidos.length > 100) {
      isValid = false;
      // Mostrar mensaje de error para el campo de apellidos
    }

    if (!form.email.includes('@')) {
      isValid = false;
      // Mostrar mensaje de error para el campo de correo electrónico
    }

    if (form.telefono.length !== 10) {
      isValid = false;
      // Mostrar mensaje de error para el campo de teléfono
    }

    if (form.direccion.length > 100) {
      isValid = false;
      // Mostrar mensaje de error para el campo de dirección
    }

    return isValid;
  }

  autos = 'busetas';
  costos = 'lunesviernes';

  RegisterStudent(studentForm: NgForm): void {
    console.log(studentForm.value);
    // Lógica adicional para registrar al estudiante
  }

  validarCedulaEcuatoriana(cedula: string): boolean {
    const cedulaRegExp = /^[0-9]{10}$/;

    if (!cedulaRegExp.test(cedula)) {
      return false;
    }

    const digitoRegion = Number(cedula.substring(0, 2));
    if (digitoRegion < 1 || digitoRegion > 24) {
      return false;
    }

    const digitoTercer = Number(cedula[2]);
    if (digitoTercer < 0 || digitoTercer > 5) {
      return false;
    }

    // Algoritmo de validación de dígitos verificadores

    return true;
  }
}
