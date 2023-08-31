import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.css']
})
export class InsertarComponent implements OnInit{

  public usuario:any;
  public id:number;
  public nombres:String;
  public apellidos:String;
  public cedula:String;
  public email:String;
  public telefono:String;
  public direccion:String;
  public genero:String;
  public vehiculoarentar:String;
  public costos:String;
  public estado:String;

  constructor(public usuarioServicio:UsuarioService, public ActivateRoute: ActivatedRoute,public router: Router)
  {this.id = this.ActivateRoute.snapshot.params['id']}

  ngOnInit(): void {
    this.getUsuariosById();
  }

  //cuerpo del json
  cuerpoFuncionUsuario(){
    let newUsuario={
      nombres:this.nombres,
      apellidos:this.apellidos,
      cedula:this.cedula,
      email:this.email,
      telefono:this.telefono,
      direccion:this.direccion,
      genero:this.genero,
      vehiculoarentar:this.vehiculoarentar,
      costos:this.costos,
      estado:this.estado
    }
    return newUsuario

  }

  //funcion asincrna:
  async actualizarAuto(){
    try {
      const usuario={
        nombres:this.nombres,
        apellidos:this.apellidos,
        cedula:this.cedula,
        email:this.email,
        telefono:this.telefono,
        direccion:this.direccion,
        genero:this.genero,
        vehiculoarentar:this.vehiculoarentar,
        costos:this.costos,
        estado:this.estado
      };
      await this.usuarioServicio.aceptarUsuarios(this.id,usuario);
      console.log('Auto actualizado correctamente');
      if (this.estado === 'activo') {
        this.router.navigate(['/prueba-ruta/activos']); // Ruta para el caso en que el estado es false
      } else {
        this.router.navigate(['/prueba-ruta/dashboard']); // Ruta para el caso en que el estado es true
      }
      // Recargar la página actual
      window.location.reload();
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async getUsuariosById() {
    try {
      this.usuario = await this.usuarioServicio.traerPorId(this.id);
      /**Enviar los usuarios pra obtener el binding */
      this.nombres = this.usuario.nombres;
      this.apellidos = this.usuario.apellidos;
      this.cedula = this.usuario.cedula;
      this.email = this.usuario.email;
      this.telefono = this.usuario.telefono;
      this.direccion = this.usuario.direccion;
      this.genero = this.usuario.genero;
      this.vehiculoarentar = this.usuario.vehiculoarentar;
      this.costos=this.usuario.costos;
      this.estado=this.usuario.estado;
    } catch (error) {
      console.log(error)
    }
  }
}
