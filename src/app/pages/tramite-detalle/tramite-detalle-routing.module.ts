import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TramiteDetallePage } from './tramite-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: TramiteDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TramiteDetallePageRoutingModule {}
