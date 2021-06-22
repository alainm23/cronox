import { Component, OnInit } from '@angular/core';

// Services
import { ActionSheetController, LoadingController, NavController, PopoverController } from '@ionic/angular';
import { MenuPage } from '../../popovers/menu/menu.page';
import { ApiService } from '../../services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home-agente',
  templateUrl: './home-agente.page.html',
  styleUrls: ['./home-agente.page.scss'],
})
export class HomeAgentePage implements OnInit {
  segment_value: string = 'todas';
  items: any [] = [];
  _items: any [] = [];
  constructor (public popoverController: PopoverController,
    public loadingController: LoadingController,
    public api: ApiService,
    public navController: NavController,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.segmentChanged (this.segment_value);
  }

  async segmentChanged (event: any) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });

    await loading.present ();

    if (this.segment_value === 'todas') {
      this.api.cuentas_listado ().subscribe ((res: any) => {
        console.log (res.cuentas);
        this.items = res.cuentas;
        this._items = res.cuentas;
        loading.dismiss ();
      }, error => {
        console.log (error);
        loading.dismiss ();
      });
    } else {
      this.api.get_aportes_pendientes ().subscribe ((res: any) => {
        console.log (res.cuentas);
        this.items = res.cuentas;
        loading.dismiss ();
      }, error => {
        console.log (error);
        loading.dismiss ();
      });
    }
  }

  async presentPopover (ev: any, item: any) {
    const popover = await this.popoverController.create({
      component: MenuPage,
      event: ev,
      translucent: true,
      componentProps: {
        items: [
        {
          id: 'tramite',
          text: this.api.get_translate ('Ver tramite')
        },
        {
          id: 'contrato',
          text: this.api.get_translate ('Ver contrato')
        },{
          id: 'cuenta',
          text: this.api.get_translate ('Ver panel del cliente')
        },{
          id: 'nuevo',
          text: this.api.get_translate ('Nuevo tramite')
        }]
      }
    });

    popover.onDidDismiss ().then (async (response: any) => {
      if (response.role === 'ok') {
        if (response.data.id === 'tramite') {
          this.navController.navigateForward (['tramite-detalle', item.idcuenta, item.plan, false]);
        } else if (response.data.id === 'nuevo') {
          this.presentActionSheet (item);
        } else if (response.data.id === 'contrato') {
          window.open (item.url_contrato, '_system');
        } else if (response.data.id === 'cuenta') {
          this.navController.navigateForward (['cuenta-detalle', item.idcuenta]);
        }
      }
    });

    return await popover.present ();
  }

  get_plan_texto (plan: string) {
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

  get_format_date (date: string) {
    if (date === null || date === undefined || date === '') {
      return '';
    }

    return moment (date).format ('ll');
  }

  async presentActionSheet (item: any) {
    const actionSheet = await this.actionSheetController.create({
      header: item.inversionista,
      subHeader: this.api.get_translate ('Seleccione el fondo'),
      translucent: true,
      mode: 'md',
      buttons: [{
        text: 'Capital Futuro',
        handler: () => {
          this.generar_id (0, item);
        }
      }, {
        text: 'Inversion Plus',
        handler: () => {
          this.generar_id (1, item);
        }
      }, {
        text: 'Bond Liquid',
        handler: () => {
          this.generar_id (2, item);
        }
      },{
        text: 'Real Estate',
        handler: () => {
          this.generar_id (3, item);
        }
      }, {
        text: this.api.get_translate ('Cancelar'),
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }

  async generar_id (plan: number, item: any) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });
    await loading.present ();

    this.api.nuevo_tramite_cliente (plan, item.idcuenta).subscribe ((res: any) => {
      console.log (res);
      this.navController.navigateForward (['tramite-detalle', res.cuenta_id, plan, true]);
      loading.dismiss ();
    }, error => {
      loading.dismiss ();
      console.log (error);
    });
  }

  go_page (page: string) {
    this.navController.navigateRoot (page);
  }
  
  get_aporte (monto: string, frecuencia: string) {
    if (frecuencia === null || frecuencia === undefined) {
      return monto;
    }

    return parseFloat (monto) * parseFloat (frecuencia);
  }
  
  search (search_text: string) {
    console.log (search_text);
    this.items = this._items;

    if (search_text !== '') {
      this.items = this.items.filter ((item: any) => {
        return item.inversionista.toLowerCase ().indexOf (search_text.toLowerCase ()) > -1; 
      });
    }
  }
}
