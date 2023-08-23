import { Component, NgModule } from '@angular/core';


interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}

@Component({
  selector: 'app-prueba-ruta',
  templateUrl: './prueba-ruta.component.html',
  styleUrls: ['./prueba-ruta.component.css'],

})


export class PruebaRutaComponent {

  isSideNavCollapsed=false;
  screenWidth=0;
  onToggleSideNav(data:SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;

  }
}
