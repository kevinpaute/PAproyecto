import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PruebaRutaComponent } from './prueba-ruta/prueba-ruta.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { VerificationComponent } from './verification/verification.component';
import { InsertarComponent } from './insertar/insertar.component';
import { AceptadosComponent } from './aceptados/aceptados.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'prueba-ruta',
    component: PruebaRutaComponent,   
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      
        {
          path: 'verification',
          component: VerificationComponent
        },
      
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path:'insertar/form/:id',
        component:InsertarComponent
      },
      {
        path:'activos',
        component:AceptadosComponent

      }

    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
