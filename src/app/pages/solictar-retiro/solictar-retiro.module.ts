import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolictarRetiroPageRoutingModule } from './solictar-retiro-routing.module';

import { SolictarRetiroPage } from './solictar-retiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolictarRetiroPageRoutingModule
  ],
  declarations: [SolictarRetiroPage]
})
export class SolictarRetiroPageModule {}
