import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiasPageRoutingModule } from './noticias-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NoticiasPage } from './noticias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiasPageRoutingModule,
    TranslateModule
  ],
  declarations: [NoticiasPage]
})
export class NoticiasPageModule {}
