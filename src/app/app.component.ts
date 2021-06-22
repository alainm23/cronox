import { Component } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
import { ApiService } from './services/api.service';
import { first } from 'rxjs/operators';
import { OneSignal, OSNotificationOpenedResult, OSNotification } from '@ionic-native/onesignal/ngx';
import { ImageLoaderConfigService } from 'ionic-image-loader-v5';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor (
    public storage: Storage,
    public translateService: TranslateService,
    public navController: NavController,
    public api: ApiService,
    public menuController: MenuController,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private imageLoaderConfig: ImageLoaderConfigService,
    private oneSignal: OneSignal,
    public platform: Platform,
    private backgroundMode: BackgroundMode,
    private device: Device) {
      this.platform.ready ().then (() => {
        this.init ();
      });
  }

  async init () {
    this.init_onesignal (JSON.parse (await this.storage.get ('USER_ACCESS')));
    this.api.get_usuario_observable ().subscribe ((usuario: any) => {
      this.init_onesignal (usuario);
    });

    this.storage.get ('lang').then (async (lang: string) => {
      if (lang === undefined || lang === null) {
        lang = 'es';
        await this.storage.set ('lang', lang);
      }
  
      moment.locale (lang);
      this.translateService.use (lang);
      this.api.CURRENT_LANG = lang;
      this.api.LANGS.forEach ((lang: any) => {
        this.translateService.getTranslation (lang).subscribe ((i18n: any) => {
          this.api.TRANSLATIONS.set (lang, i18n);
        });
      });
    });

    this.imageLoaderConfig.setWidth ('40vw');
    this.imageLoaderConfig.setHeight ('40vw');
    this.imageLoaderConfig.setBackgroundSize ('cover');

    if (this.platform.is ('cordova')) {
      if (this.device.platform.toLowerCase () == 'android' && parseInt (this.device.version, 10) < 8) {
        this.backgroundMode.enable ();
      }
    }
  }

  init_onesignal (usuario: any) {
    if (this.platform.is ('cordova') && usuario !== null && usuario !== undefined) {
      this.oneSignal.startInit ('822e4be3-ca69-472f-ba0a-7f7e8a84cfd6', '743541826445');
      this.oneSignal.inFocusDisplaying (this.oneSignal.OSInFocusDisplayOption.Notification);

      this.oneSignal.handleNotificationReceived ().subscribe ((OSNotification: any) => {
        // do something when notification is received
      });
      
      this.oneSignal.handleNotificationOpened ().subscribe ((OSNotificationOpenedResult: any) => {
        // do something when a notification is opened
      });
      
      this.oneSignal.endInit ();

      this.oneSignal.getIds ().then ((oS: any) => {
        
      });

      this.oneSignal.getTags ().then ((data: any) => {
        
      });

      if (usuario.tipo === 'user') {
        this.oneSignal.sendTag ('Cliente', 'true');
        this.oneSignal.sendTag ('Cliente-' + usuario.id, 'true');
      } else {
        this.oneSignal.sendTag ('Agente', 'true');
        this.oneSignal.sendTag ('Agente-' + usuario.id, 'true');
      }
    }
  }

  go_page (page: string) {
    this.navController.navigateForward (page);
  }

  go_root (page: string) {
    if (page === 'asesores') {
      this.navController.navigateRoot ([page, 'todas']);
    } else if (page === 'tramites') {
      this.navController.navigateRoot ([page, 'en-proceso']);
    } else {
      this.navController.navigateRoot (page);
    }
  }

  close_menu () {
    this.menuController.toggle ();
  }

  async salir () {
    const alert = await this.alertController.create({
      header: this.api.get_translate ('Cerrar sesión'),
      message: this.api.get_translate ('¿Está seguro que desea cerrar sesión?'),
      buttons: [
        {
          text: this.api.get_translate ('Cancelar'),
          role: 'cancel'
        }, {
          text: this.api.get_translate ('Confirmar'),
          handler: async () => {
            const loading = await this.loadingController.create({
              message: this.api.get_translate ('Procesando...')
            });

            await loading.present ();

            this.api.logout ().subscribe (async (res: any) => {
              console.log (res);
              await loading.dismiss ();
              this.borrar_user_access ();
            }, async error => {
              console.log (error);
              await loading.dismiss ();
              this.borrar_user_access ();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  borrar_user_access () {
    this.storage.remove ('USER_ACCESS').then (() => {
      this.navController.navigateRoot ('inicio-selector');
    });
  }
}
