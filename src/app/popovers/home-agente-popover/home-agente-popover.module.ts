import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAgentePopoverPageRoutingModule } from './home-agente-popover-routing.module';

import { HomeAgentePopoverPage } from './home-agente-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAgentePopoverPageRoutingModule
  ],
  declarations: [HomeAgentePopoverPage]
})
export class HomeAgentePopoverPageModule {}
