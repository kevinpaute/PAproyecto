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

}
