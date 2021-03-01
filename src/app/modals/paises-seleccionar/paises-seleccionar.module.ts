import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaisesSeleccionarPageRoutingModule } from './paises-seleccionar-routing.module';

import { PaisesSeleccionarPage } from './paises-seleccionar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaisesSeleccionarPageRoutingModule
  ],
  declarations: [PaisesSeleccionarPage]
})
export class PaisesSeleccionarPageModule {}
