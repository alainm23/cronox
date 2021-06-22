import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosPageRoutingModule } from './documentos-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentosPage } from './documentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentosPageRoutingModule,
    TranslateModule
  ],
  declarations: [DocumentosPage]
})
export class DocumentosPageModule {}
