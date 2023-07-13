import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-upload-alert',
  template: `
     <div class="container d-flex justify-content-center align-items-center border border-transparent">
      <div class="text-center">
        <h1><span>Ingrese el comprobante</span></h1><br>
        <p>Para poder completar su registro para rentar auto es necesario que suba una imagen (PNG o JPEG) con el comprobante de pago para lograr confirmar su pedido.</p>
        <re-captcha (resolved)="resolved($event)" siteKey="6LdXWWcmAAAAAEBzP7kGaFJvNOUw6wJL7RGc6o4e"></re-captcha><br>
        <button class="btn btn-primary" (click)="showImageUploadAlert()"><span>Seleccionar imagen</span></button>
      </div>
    </div>`
    ,
  styles: [`
    .image-upload-button {
      padding: 10px 20px;
      background-color: #2196f3;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    .container {
      height: 85vh;
    }
    h1,p{
      color: white;
    }
    .btn{
      color: black;
      background-color: white;
      border-radius: 5px;
    }
    .btn-primary:hover {
    color: black;
    background-color: white;
    border-color: #285e8e; /*set the color you want here*/
}
    @import '~bootstrap/dist/css/bootstrap.min.css';
  `]
})
export class ImageUploadAlertComponent {
  imageUrl: string;
  captchaValid: boolean = false;

  showImageUploadAlert() {
    // Verificar que el captcha haya sido completado
    if (!this.captchaValid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete el captcha',
        icon: 'error'
      });
      return;
    }

    Swal.fire({
      title: 'Seleccionar imagen',
      input: 'file',
      inputAttributes: {
        'accept': '.png, .jpeg',
        'aria-label': 'Subir tu foto de perfil'
      },
      showCancelButton: true,
      confirmButtonText: 'Subir',
      cancelButtonText: 'Cancelar',
      preConfirm: (file) => {
        return new Promise((resolve, reject) => {
          if (file) {
            if (this.isFileTypeValid(file, 'image/png')) {
              const reader = new FileReader();
              reader.onload = (e: any) => {
                this.imageUrl = e.target.result;
                resolve({
                  file: file,
                  imageUrl: this.imageUrl
                });
              };
              reader.readAsDataURL(file);
            } else {
              reject('El archivo seleccionado no es una imagen con formato PNG o JPEG válida.');
            }
          } else {
            resolve(null);
          }
        });
      }
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Imagen cargada correctamente',
          imageUrl: this.imageUrl,
          imageAlt: 'Imagen cargada correctamente'
        });
      }
    }).catch((error) => {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error'
      });
    });
  }

  resolved(captchaResponse: string) {
    this.captchaValid = ( captchaResponse && captchaResponse.length > 0)? true:false;
  }

  isFileTypeValid(file: File, fileType: string): boolean {
    return file.type === fileType;
  }
}

