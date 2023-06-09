import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  mostrarAlerta(){
    Swal.fire(
      'Cliente Aceptado',
      'Aceptado',
      'success'
    )
  }

  errorAlerta(){
    Swal.fire({
      icon: 'error',
      title: 'No es Correcto',
      text: 'Enviado Correo Electrónico',
      footer: '<a href="">@RentaAutos</a>'
    })
  }

}
