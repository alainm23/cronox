import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-noticia-detalle',
  templateUrl: './noticia-detalle.page.html',
  styleUrls: ['./noticia-detalle.page.scss'],
})
export class NoticiaDetallePage implements OnInit {
  item: any = {};
  constructor (private navController: NavController,
    private api: ApiService,
    private loadingController: LoadingController,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    const loading = await this.loadingController.create ({
      message: this.api.get_translate ('Procesando...')
    });

    await loading.present ();

    this.api.get_noticias_detalle (this.api.USER_ACCESS.tipo, this.route.snapshot.paramMap.get ('id')).subscribe ((res: any) => {
      console.log (res);
      loading.dismiss ();
      this.item = res.noticia;
    }, error => {
      loading.dismiss ();
      console.log (error);
    });
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
}
