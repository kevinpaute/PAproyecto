import { Component } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent {

  file:File | undefined;
  photoSelected:string | ArrayBuffer | undefined;
  constructor(private photoService:PhotoService){}


  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // Previsualizar imagen
      const reader = new FileReader();
      reader.onload = e => (this.photoSelected = reader.result || undefined);
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: string, description: string): boolean {
    console.log(title);
    console.log(description);
  
    if (this.file) { // Verificar si this.file no es undefined
      this.photoService.createFoto(title, description, this.file)
        .subscribe(res => console.log(res), err => console.log(err));
    } else {
      console.log("No se ha seleccionado ninguna foto.");
    }
    
    return false;
  }
  

}
