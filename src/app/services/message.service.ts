import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessageService {
  constructor(private _http: HttpClient) { }

  sendMessage(body: any) {
    const url = 'http://3.135.203.27:9000/api/users'; // Reemplaza esta URL con la correcta para tu servidor
    return this._http.post(url, body);
  }
}
