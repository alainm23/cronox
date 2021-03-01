import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaisesSeleccionarPage } from './paises-seleccionar.page';

const routes: Routes = [
  {
    path: '',
    component: PaisesSeleccionarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaisesSeleccionarPageRoutingModule {}
