import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaDetallePage } from './cuenta-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaDetallePageRoutingModule {}
