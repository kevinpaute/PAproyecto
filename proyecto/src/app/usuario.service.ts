import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = "http://localhost:3000/api/"; //llamar

  constructor(public http:HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(this.url+'login', body);
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

