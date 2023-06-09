import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

export interface Persona {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: string;
  auto: string;
  costo: number;
}
const PERSONAS: Persona[] = [
  {
    nombres: 'John',
    apellidos: 'Doe',
    email: 'johndoe@example.com',
    telefono: '1234567890',
    direccion: 'Calle Principal 123',
    auto: 'Toyota Camry',
    costo: 20000
  },
  // Agrega más objetos de persona según necesites
];



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dataSource = new MatTableDataSource<Persona>(PERSONAS);
  displayedColumns: string[] = ['nombres', 'apellidos', 'email', 'telefono', 'direccion', 'auto', 'costo', 'acciones'];

  aceptarPersona(persona: Persona) {
    // Lógica para aceptar la persona
  }
  
  rechazarPersona(persona: Persona) {
    // Lógica para rechazar la persona
  }
  

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

