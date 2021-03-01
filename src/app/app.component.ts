import { Component } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor (private storage: Storage, private translateService: TranslateService) {
    this.init ();
  }

  async init () {
    let lang: string = await this.storage.get ('lang');

    if (lang === undefined || lang === null) {
      lang = 'es';
      this.storage.set ('lang', 'es');
    }

    moment.locale (lang);
    this.translateService.use (lang);
  }
}
