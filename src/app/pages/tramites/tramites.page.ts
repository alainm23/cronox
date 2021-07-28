import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ActionSheetController,
  PopoverController,
  LoadingController,
  AlertController,
  ToastController,
} from '@ionic/angular';

// Services
import { ApiService } from '../../services/api.service';
import * as moment from 'moment';
import { MenuPage } from '../../popovers/menu/menu.page';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.page.html',
  styleUrls: ['./tramites.page.scss'],
})
export class TramitesPage implements OnInit {
  segment_value: string = 'en-proceso';
  items: any[] = [];
  _items: any[] = [];
  constructor(
    private api: ApiService,
    private navController: NavController,
    private actionSheetController: ActionSheetController,
    private popoverController: PopoverController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.segment_value = this.route.snapshot.paramMap.get('segment_value');
    this.segmentChanged(this.segment_value);
  }

  async segmentChanged(event: any) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate('Procesando...'),
    });
    await loading.present();
    
    this.api.get_tramites(event).subscribe(
      (res: any) => {
        console.log(res.cuentas);
        this.items = res.cuentas;
        this._items = res.cuentas;
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  ver_tramite(tipo: string) {
    this.navController.navigateForward([
      'tramite-detalle',
      'ascasc',
      tipo,
      true,
    ]);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccione el fondo',
      mode: 'md',
      buttons: [
        {
          text: 'Capital Futuro',
          handler: () => {
            this.generar_id(0);
          },
        },
        {
          text: 'Inversion Plus',
          handler: () => {
            this.generar_id(1);
          },
        },
        {
          text: 'Bond Liquid',
          handler: () => {
            this.generar_id(2);
          },
        },
        {
          text: 'Real Estate',
          handler: () => {
            this.generar_id(3);
          },
        },
        {
          text: this.api.get_translate('Cancelar'),
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async generar_id(plan: number) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate('Procesando...'),
    });
    await loading.present();

    if (plan === 0) {
      this.api.generate_id_capital_futuro().subscribe(
        (res: any) => {
          console.log(res);
          this.navController.navigateForward([
            'tramite-detalle',
            res.cuenta_id,
            plan,
            true,
          ]);
          loading.dismiss();
        },
        (error) => {
          loading.dismiss();
          console.log(error);
        }
      );
    } else if (plan == 1) {
      this.api.generate_id_inversion_plus().subscribe(
        (res: any) => {
          console.log(res);
          loading.dismiss();
          this.navController.navigateForward([
            'tramite-detalle',
            res.cuenta_id,
            plan,
            true,
          ]);
        },
        (error) => {
          loading.dismiss();
          console.log(error);
        }
      );
    } else if (plan === 2) {
      this.api.generate_id_bond_liquid().subscribe(
        (res: any) => {
          console.log(res);
          loading.dismiss();
          this.navController.navigateForward([
            'tramite-detalle',
            res.cuenta_id,
            plan,
            true,
          ]);
        },
        (error) => {
          loading.dismiss();
          console.log(error);
        }
      );
    } else if (plan === 3) {
      this.api.generate_id_real_estate().subscribe(
        (res: any) => {
          console.log(res);
          loading.dismiss();
          this.navController.navigateForward([
            'tramite-detalle',
            res.cuenta_id,
            plan,
            true,
          ]);
        },
        (error) => {
          loading.dismiss();
          console.log(error);
        }
      );
    }
  }

  get_plan_texto(plan: string) {
    if (plan === null || plan === undefined || plan === '') {
      return '';
    }

    if (plan === '0') {
      return 'Capital Futuro';
    } else if (plan === '1') {
      return 'Inversión Plus';
    } else if (plan === '2') {
      return 'Bond Liquid';
    } else if (plan === '3') {
      return 'Real Estate';
    }
  }

  get_format_date(date: string) {
    if (date === null || date === undefined || date === '') {
      return '';
    }

    return moment(date).format('ll');
  }

  async presentPopover(ev: any, item: any) {
    ev.stopPropagation();

    const popover = await this.popoverController.create({
      component: MenuPage,
      event: ev,
      translucent: true,
      componentProps: {
        items: [
          {
            id: 'editar',
            text: this.api.get_translate('Editar'),
          },
          {
            id: 'eliminar',
            text: this.api.get_translate('Eliminar'),
          },
        ],
      },
    });

    popover.onDidDismiss().then(async (response: any) => {
      if (response.role === 'ok') {
        console.log(response.data);
        if (response.data.id === 'editar') {
          this.navController.navigateForward([
            'tramite-detalle',
            item.idcuenta,
            item.plan,
            true,
          ]);
        } else if (response.data.id === 'eliminar') {
          const alert = await this.alertController.create({
            header: this.api.get_translate('Confirmar operación'),
            message: this.api.get_translate(
              '¿Esta seguro que desea eliminar este tramite?'
            ),
            buttons: [
              {
                text: this.api.get_translate('Cancelar'),
                role: 'cancel',
              },
              {
                text: this.api.get_translate('Confirmar'),
                handler: () => {
                  this.eliminar_tramite(item);
                },
              },
            ],
          });

          await alert.present();
        }
      }
    });

    return await popover.present();
  }

  async eliminar_tramite(item: any) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate('Procesando...'),
    });
    await loading.present();

    this.api.eliminar_tramite(item.plan, item.idcuenta).subscribe(
      (res: any) => {
        console.log(res);
        loading.dismiss();
        this.presentToast(
          this.api.get_translate('El tramite fue eliminado correctamente'),
          'success'
        );
        this.segmentChanged(this.segment_value);
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  editar(item: any) {
    console.log(item);
  }

  search(search_text: string) {
    this.items = this._items;

    if (search_text !== '') {
      this.items = this.items.filter((item: any) => {
        return (
          item.inversionista.toLowerCase().indexOf(search_text.toLowerCase()) >
          -1
        );
      });
    }
  }

  go_page(page: string) {
    this.navController.navigateRoot(page);
  }

  async presentToast(message: any, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000,
      position: 'top',
    });

    toast.present();
  }

  action(item: any) {
    if (
      this.segment_value === 'pendientes' ||
      this.segment_value === 'observados'
    ) {
      this.navController.navigateForward([
        'tramite-detalle',
        item.idcuenta,
        item.plan,
        true,
      ]);
    } else if (this.segment_value === 'en-proceso') {
      this.navController.navigateForward([
        'tramite-detalle',
        item.idcuenta,
        item.plan,
        false,
      ]);
    }
  }
}
