import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TramiteFormularioPage } from './tramite-formulario.page';

const routes: Routes = [
  {
    path: '',
    component: TramiteFormularioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TramiteFormularioPageRoutingModule {}
