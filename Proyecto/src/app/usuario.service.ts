import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = "http://localhost:9000/api/"; //llamar
  urlImagen = "http://localhost:9000/api"; //llamar

  constructor(public http:HttpClient) { }

  getPersona(): Promise<any[]> {
    return new Promise(resolve => {
      this.http.get<any[]>(this.url + 'personas').subscribe({
        next: async (data) => {
          // Recorre el array de usuarios para agregar la propiedad 'imagenUrl'
          for (const persona of data) {
            // Construye la URL completa de la imagen
            persona.imagenUrl = `${this.url}imagenes/${persona.imagen}`;
          }
          resolve(data);
        },
        error(err) {
          console.log(err);
          resolve([]); // Si hay un error, se resuelve una lista vacía
        }
      });
    });
  }

  subirImagen(imagen: File): Promise<string> {
    const formData = new FormData();
    formData.append('imagen', imagen);

    return new Promise((resolve, reject) => {
      this.http.post<any>(`${this.url}imagen`, formData).subscribe(
        (data) => {
          resolve(data.imagenUrl);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
      /**Obtner todos */
      getUsers(){
        /**UTILIZAR UNA "PROMESA" PERMITE MAJEAR LA PROGRAMACION ASINCONA LO QUE PERMITE HACER TAREAS CONSULTAS POR VARIOS CLIENTE*/
        return new Promise(resolve =>{
          this.http.get(this.url +'users').subscribe({
            next: (data) => {
              resolve(data);
            },
            error(err) {
              console.log(err)
            }
          });
        });
      }

      getUserEsperando(){
        return new Promise(resolve =>{
          this.http.get(this.url +'users'+'/estado'+'/esperando').subscribe({
            next: (data) => {
              resolve(data);
            },
            error(err) {
              console.log(err)
            }
          });
        });

      }


      /*Traer por id */
      traerPorId(id:number) {
        return new Promise(resolve =>{
          this.http.get(this.url +'users/'+id).subscribe({
            next: (data) => {
              resolve(data);
            },
            error(err) {
              console.log(err)
            }
          });
        });
      
      }


      aceptarUsuarios(id:number,usuario:any){
        return new Promise(resolve =>{
          this.http.put(this.url +'users/'+id, usuario).subscribe({
            next: (data) => {
              resolve(data);
            },
            error(err) {
              console.log(err)
            }
          });
        });

      }

      getUserActivo(){
        return new Promise(resolve =>{
          this.http.get(this.url +'users'+'/estado'+'/activo').subscribe({
            next: (data) => {
              resolve(data);
            },
            error(err) {
              console.log(err)
            }
          });
        });

      }
      getUserInactivo(){
        return new Promise(resolve =>{
          this.http.get(this.url +'users'+'/estado'+'/inactivo').subscribe({
            next: (data) => {
              resolve(data);
            },
            error(err) {
              console.log(err)
            }
          });
        });

      }

      


  
}

