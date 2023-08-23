import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UsuarioService } from '../usuario.service';


export interface Persona {
  nombres: string;
  apellidos: string;
  imagen: string;
}

const PERSONAS: Persona[] = [
  {
    nombres: 'John',
    apellidos: 'Doe',
    imagen: 'https://picsum.photos/200/300'
  },
  // Agrega más objetos de persona según necesites
];



@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  dataSource = new MatTableDataSource<Persona>(PERSONAS);
  displayedColumns: string[] = ['nombres', 'apellidos', 'imagen','acciones'];

  personas: Persona[] = [];
  

  ngOnInit(): void {
    this.personaService.getPersona().then(
      (data) => {
        this.personas = data; // Asigna los datos recibidos a la propiedad personas
      },
      (error) => {
        console.log('Error al obtener las personas:', error);
      }
    );
    throw new Error('Method not implemented.');
  }




  aceptarPersona(persona: Persona) {
    // Lógica para aceptar la persona
  }
  
  rechazarPersona(persona: Persona) {
    // Lógica para rechazar la persona
  }

  constructor(public dialog: MatDialog, private personaService: UsuarioService) {}
  

  imagen(){
    Swal.fire({
      html: '<img src="assets/data/comprobante.png">'

    }
      
    )
  }
  
  

  mostrarAlerta(){
    Swal.fire(
      'Pago Aceptado',
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
