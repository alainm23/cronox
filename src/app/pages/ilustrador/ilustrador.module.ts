import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IlustradorPageRoutingModule } from './ilustrador-routing.module';

import { IlustradorPage } from './ilustrador.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IlustradorPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [IlustradorPage]
})
export class IlustradorPageModule {}
