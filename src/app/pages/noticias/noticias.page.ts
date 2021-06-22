import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  items: any [] = [];
  constructor (private navController: NavController,
    private api: ApiService,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create ({
      message: this.api.get_translate ('Procesando...')
    });

    await loading.present ();

    this.api.get_noticias (this.api.USER_ACCESS.tipo).subscribe ((res: any) => {
      console.log (res);
      this.items = res.noticias;
      loading.dismiss ();
    }, error => {
      loading.dismiss ();
      console.log (error);
    });
  }

  go_page (page: string) {
    this.navController.navigateRoot (page);
  }

  get_image (image: string) {
    return 'https://portal.cronoxcapital.com.pe' + image;
  }

  get_format_date (date: string) {
    if (date === undefined || date === null) {
      return '';
    }

    return moment (date).format ('ll');
  }

  ver_detalle (item: any) {
    this.navController.navigateForward (['noticia-detalle', item.id])
  }
}
