import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InversionesOtrasPageRoutingModule } from './inversiones-otras-routing.module';

import { InversionesOtrasPage } from './inversiones-otras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InversionesOtrasPageRoutingModule
  ],
  declarations: [InversionesOtrasPage]
})
export class InversionesOtrasPageModule {}
