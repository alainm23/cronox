import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rest
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OneSignal } from '@ionic-native/onesignal/ngx';

// Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Globalization } from '@ionic-native/globalization/ngx';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicImageLoaderModule } from 'ionic-image-loader-v5';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Device } from '@ionic-native/device/ngx';

// Modals
import { PaisesSeleccionarPageModule } from './modals/paises-seleccionar/paises-seleccionar.module';
import { HomeAgentePopoverPageModule } from './popovers/home-agente-popover/home-agente-popover.module';
import { MenuPageModule } from './popovers/menu/menu.module';
import { SolictarRetiroPageModule } from './modals/solictar-retiro/solictar-retiro.module';

export function HttpLoaderFactory (http: HttpClient) {
  return new TranslateHttpLoader (http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot (),
    PaisesSeleccionarPageModule,
    HomeAgentePopoverPageModule,
    MenuPageModule,
    IonicImageLoaderModule,
    NgxIonicImageViewerModule,
    SolictarRetiroPageModule
  ],
  providers: [
    CallNumber,
    SocialSharing,
    Globalization,
    OneSignal,
    Camera,
    Device,
    BackgroundMode,
    WebView,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
