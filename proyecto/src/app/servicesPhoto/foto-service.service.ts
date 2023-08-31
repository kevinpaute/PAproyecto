import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../interfaces/Photo';

@Injectable({
  providedIn: 'root'
})
export class FotoServiceService {
  URL='http://localhost:4000/api/users-with-photos'

  constructor(private http:HttpClient) { }

  getFotos(){
    return this.http.get<Photo[]>(this.URL);
  }


}
