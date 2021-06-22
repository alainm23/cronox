import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

// Services
import { ApiService } from '../../services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-inversiones-otras',
  templateUrl: './inversiones-otras.page.html',
  styleUrls: ['./inversiones-otras.page.scss'],
})
export class InversionesOtrasPage implements OnInit {
  items: any [] = [];
  lang: string;
  URL: string = 'http://portal.cronoxcapital.com.pe';
  constructor (private api: ApiService,
    private loadingController: LoadingController,
    private storage: Storage) { }

  async ngOnInit() {
    this.lang = await this.storage.get ('lang');

    let loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });

    await loading.present ();

    this.api.get_otras_inversiones ().subscribe ((res: any) => {
      console.log (res);
      loading.dismiss ();
      this.items = res.otras_inversiones;
    }, error => {
      loading.dismiss ();
      console.log (error);
    });
  }

  get_nombre (nombre: any) {
    if (this.lang === 'pt') {
      this.lang = 'por';
    }

    if (nombre [this.lang] === undefined || nombre [this.lang] === null) {
      return nombre ['es'];
    }

    return nombre [this.lang];
  }

  descargar (documento: any) {
    console.log (documento);
    console.log (this.lang);
    
    if (this.lang === 'pt') {
      this.lang = 'por';
    }

    if (documento [this.lang] !== undefined && documento [this.lang] !== null) {
      window.open(encodeURI (this.URL + documento [this.lang]),"_system","location=yes");
    } else {
      if (documento ['es'] === undefined || documento ['es'] === null) {
        return;
      } else {
        window.open(encodeURI (this.URL + documento ['es']),"_system","location=yes");
      }
    }
  }
}
