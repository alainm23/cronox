import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioUnoPageRoutingModule } from './inicio-uno-routing.module';

import { InicioUnoPage } from './inicio-uno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioUnoPageRoutingModule
  ],
  declarations: [InicioUnoPage]
})
export class InicioUnoPageModule {}
