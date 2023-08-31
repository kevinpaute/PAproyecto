import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FotoServicesService {

  URL='http://localhost:4000/api/photos'
  id: string | undefined; // Define la propiedad usuarioId

  constructor() { }

  createFoto(title:string, description:string,photo:File){

    const fd =new FormData();
    fd.append('title',title);
    fd.append('description',description);
    fd.append('image',photo);
    return this.http.post(this.URL, fd);

  }

  
  createFotoWithUser(title: string, description: string, usuario: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('usuario', usuario); // Agregar el ID del usuario al FormData
    fd.append('image', photo);
    return this.http.post(this.URL + `/${usuario}`, fd); // Agregar el ID del usuario en la URL
  }
  


}
