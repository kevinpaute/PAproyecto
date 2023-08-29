import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroFormularioComponent } from './registro-formulario/registro-formulario.component';

const routes: Routes = [
  { path: 'registro-formulario', component: RegistroFormularioComponent },
  // Otras rutas de tu aplicación
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
