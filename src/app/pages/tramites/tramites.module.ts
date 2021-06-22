import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TramitesPageRoutingModule } from './tramites-routing.module';

import { TramitesPage } from './tramites.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TramitesPageRoutingModule,
    TranslateModule
  ],
  declarations: [TramitesPage]
})
export class TramitesPageModule {}
