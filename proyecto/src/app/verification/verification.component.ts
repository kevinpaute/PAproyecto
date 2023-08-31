import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FotoServiceService } from '../servicesPhoto/foto-service.service';
import { Photo } from '../interfaces/Photo';


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

  usersWithPhotos: any[] = []; // Cambia any por el tipo adecuado
  constructor(private photoService:FotoServiceService) {}
  title:string;

  ngOnInit(): void {
    this.photoService.getFotos()
      .subscribe(
        res => {
          this.usersWithPhotos = res; // Asigna la respuesta al arreglo usersWithPhotos
        },
        err => console.log(err)
      );
  }

  getImagePath(user: any): string {
    return 'http://localhost:4000/' + user.photos[0]?.imagePath || 'assets/default-image.jpg';
  }
  

  

  

}
