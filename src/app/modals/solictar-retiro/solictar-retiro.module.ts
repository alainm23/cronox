import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolictarRetiroPageRoutingModule } from './solictar-retiro-routing.module';
import { SolictarRetiroPage } from './solictar-retiro.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolictarRetiroPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [SolictarRetiroPage]
})
export class SolictarRetiroPageModule {}
