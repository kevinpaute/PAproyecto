import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-aceptados',
  templateUrl: './aceptados.component.html',
  styleUrls: ['./aceptados.component.css']
})
export class AceptadosComponent implements OnInit{
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



  constructor(public usuarioService:UsuarioService, public router:Router){}
  ngOnInit(): void {
    this.cargarUsuariosActivos();
  }


  cargarUsuariosActivos(){
    this.usuarioService.getUserActivo().then(data=>this.usuario=data)
  }

}
