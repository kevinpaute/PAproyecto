import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  URL='http://localhost:4000/api/photos'
  id: string | undefined; // Define la propiedad usuarioId

  constructor(private http:HttpClient) { }



  createFoto(title:string, description:string,photo:File){

    const fd =new FormData();
    fd.append('title',title);
    fd.append('description',description);
    fd.append('image',photo);
    return this.http.post(this.URL, fd);

  }


  createFotoWithUser(usuario: string, photo: File) {
    const fd = new FormData();
    //fd.append('title', title);
    //fd.append('description', description);
    fd.append('usuario', usuario); // Agregar el ID del usuario al FormData
    fd.append('image', photo);
    return this.http.post(this.URL + `/${usuario}`, fd); // Agregar el ID del usuario en la URL
  }
}
