import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioDosPageRoutingModule } from './inicio-dos-routing.module';

import { InicioDosPage } from './inicio-dos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioDosPageRoutingModule
  ],
  declarations: [InicioDosPage]
})
export class InicioDosPageModule {}
