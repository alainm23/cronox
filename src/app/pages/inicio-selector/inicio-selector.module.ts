import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioSelectorPageRoutingModule } from './inicio-selector-routing.module';

import { InicioSelectorPage } from './inicio-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioSelectorPageRoutingModule
  ],
  declarations: [InicioSelectorPage]
})
export class InicioSelectorPageModule {}
