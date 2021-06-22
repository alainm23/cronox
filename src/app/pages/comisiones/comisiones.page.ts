import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NavController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.page.html',
  styleUrls: ['./comisiones.page.scss'],
})
export class ComisionesPage implements OnInit {
  items: any [] = [];
  constructor (private api: ApiService, private loadingController: LoadingController,
    private navController: NavController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });
    await loading.present ();

    this.api.get_comisiones_fechas ().subscribe ((res: any) => {
      console.log (res);
      this.items = res.fechas_comisiones;
      loading.dismiss ();
    }, error => {
      console.log (error);
      loading.dismiss ();
    });
  }

  async descargar (item: any) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });

    await loading.present ();

    this.api.download_pdf_liquidacion (item.fecha_pago).subscribe ((res: any) => {
      console.log (res);
      loading.dismiss ();

      window.open(encodeURI(res.url_pdf),"_system","location=yes");
    }, error => {
      loading.dismiss ();
      console.log (error);
    });
  }

  go_page (page: string) {
    this.navController.navigateRoot (page);
  }

  get_format (date: string) {
    if (date === null || date === undefined) {
      return '';
    }

    return moment (date.replace ('-', '/'), 'DD/MM/YYYY').format ('ll');
  }
}
