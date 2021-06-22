import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiaDetallePageRoutingModule } from './noticia-detalle-routing.module';

import { NoticiaDetallePage } from './noticia-detalle.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicImageLoaderModule } from 'ionic-image-loader-v5';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiaDetallePageRoutingModule,
    TranslateModule,
    IonicImageLoaderModule,
    NgxIonicImageViewerModule
  ],
  declarations: [NoticiaDetallePage]
})
export class NoticiaDetallePageModule {}
