import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})

export class ImagenComponent implements OnInit{

  public imagenSeleccionada: File | null = null;

  constructor(private imagenService: UsuarioService) { }
  ngOnInit(): void {
    this.subirImagen( );
    throw new Error('Method not implemented.');
  }

  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0] as File;

    if (this.imagenSeleccionada && this.imagenSeleccionada.type === 'image/png') {
      this.imagenSeleccionada = this.imagenSeleccionada;
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona una imagen en formato PNG.',
        icon: 'error'
      });
      this.imagenSeleccionada = null;
    }

  }

  async subirImagen() {
    if (this.imagenSeleccionada) {
      try {
        const imagenURL = await this.imagenService.subirImagen(this.imagenSeleccionada);
        console.log('Imagen cargada exitosamente:', imagenURL);
        // Realiza acciones adicionales después de guardar la imagen
      } catch (error) {
        console.log('Error al cargar la imagen:', error);
      }
    } else {
      console.log('Por favor, selecciona una imagen.');
    }
  }
}


