import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InvitarAgentePageRoutingModule } from './invitar-agente-routing.module';

import { InvitarAgentePage } from './invitar-agente.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitarAgentePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [InvitarAgentePage]
})
export class InvitarAgentePageModule {}
