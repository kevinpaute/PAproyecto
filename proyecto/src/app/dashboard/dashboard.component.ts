import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public usuario:any;
  public id:number;
  public nombres:string;
  public apellidos:string;
  public cedula:string;
  public email:string;
  public telefono:string;
  public direccion:string;
  public genero:string;
  public vehiculoarentar:string;
  public costos:string;
  public estado:string;

  ngOnInit(): void {
      this.cargarUsuarioEsperando();
  }

  constructor(public usuarioService:UsuarioService, public router:Router){}

  cargarUsuarios(){
    this.usuarioService.getUsers().then(data => this.usuario = data)
  }

  cargarUsuarioEsperando(){
    this.usuarioService.getUserEsperando().then(data=>this.usuario=data)
  }

  

  

}

