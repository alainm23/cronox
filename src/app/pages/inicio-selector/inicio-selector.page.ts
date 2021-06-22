import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { MenuPage } from '../../popovers/menu/menu.page';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-inicio-selector',
  templateUrl: './inicio-selector.page.html',
  styleUrls: ['./inicio-selector.page.scss'],
})
export class InicioSelectorPage implements OnInit {
  current_lang: string = '';
  constructor (private navController: NavController,
    private api: ApiService,
    private popoverController: PopoverController,
    private translateService: TranslateService,
    private storage: Storage) { }

  ngOnInit () {
    this.update_current_lang ();
  }

  update_current_lang () {
    this.storage.get ('lang').then ((lang: string) => {
      if (lang === 'es') {
        this.current_lang = 'Español';
      } else if (lang === 'en') {
        this.current_lang = 'English';
      } else if (lang === 'pt') {
        this.current_lang = 'Português';
      }
    });
  }

  login (tipo: string) {
    this.navController.navigateForward (['login', tipo]);
  }

  async presentPopover (ev: any) {
    const popover = await this.popoverController.create ({
      component: MenuPage,
      event: ev,
      translucent: true,
      componentProps: {
        items: [
        {
          id: 'es',
          text: 'Español'
        },
        {
          id: 'en',
          text: 'English'
        },
        {
          id: 'pt',
          text: 'Português'
        }]
      }
    });

    popover.onDidDismiss ().then (async (response: any) => {
      if (response.role === 'ok') {
        this.set_lang (response.data.id);
      }
    });

    return await popover.present ();
  }

  set_lang (lang: string) {
    this.storage.set ('lang', lang).then (() => {
      moment.locale (lang);
      this.translateService.use (lang);
      this.api.CURRENT_LANG = lang;
      this.update_current_lang ();
    });
  }
}
