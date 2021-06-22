import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsesoresPageRoutingModule } from './asesores-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { AsesoresPage } from './asesores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsesoresPageRoutingModule,
    TranslateModule
  ],
  declarations: [AsesoresPage]
})
export class AsesoresPageModule {}
