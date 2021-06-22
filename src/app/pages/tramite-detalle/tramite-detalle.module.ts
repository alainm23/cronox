import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TramiteDetallePageRoutingModule } from './tramite-detalle-routing.module';

import { TramiteDetallePage } from './tramite-detalle.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TramiteDetallePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [TramiteDetallePage]
})
export class TramiteDetallePageModule {}
