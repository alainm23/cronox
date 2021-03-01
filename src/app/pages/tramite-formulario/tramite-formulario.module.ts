import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TramiteFormularioPageRoutingModule } from './tramite-formulario-routing.module';

import { TramiteFormularioPage } from './tramite-formulario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TramiteFormularioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TramiteFormularioPage]
})
export class TramiteFormularioPageModule {}
