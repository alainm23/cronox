import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaDetallePageRoutingModule } from './cuenta-detalle-routing.module';

import { CuentaDetallePage } from './cuenta-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaDetallePageRoutingModule
  ],
  declarations: [CuentaDetallePage]
})
export class CuentaDetallePageModule {}