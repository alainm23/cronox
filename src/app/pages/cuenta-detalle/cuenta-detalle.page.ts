import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController, ActionSheetController, ModalController } from '@ionic/angular';

// Services
import { ApiService } from '../../services/api.service';
import { Chart } from 'chart.js';
import 'anychart';
import * as moment from 'moment';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SolictarRetiroPage } from '../../modals/solictar-retiro/solictar-retiro.page';

@Component({
  selector: 'app-cuenta-detalle',
  templateUrl: './cuenta-detalle.page.html',
  styleUrls: ['./cuenta-detalle.page.scss'],
})
export class CuentaDetallePage implements OnInit {
  chart: anychart.charts.Cartesian = null;
  chart_pie: anychart.charts.Pie = null;
  chart_pie_list: any = {
    'portafolio_1': null,
    'portafolio_2': null,
    'portafolio_3': null
  };
  
  cuenta: any = {
    abc: 'Si',
    numero_cuenta_tb: '',
    numero_tarjeta_tc: '',
    nombre_banco_tb: '',
    nombre_banco_tc: ''
  };
  plan_text: string = '';
  segment_value: string = 'resumen';
  filtro_lineal: string = '1A';
  grafica_lineal: any [] = [];
  _grafica_lineal: any [] = [];
  constructor (public api: ApiService,
      private route: ActivatedRoute,
      private navController: NavController,
      private loadingController: LoadingController,
      private callNumber: CallNumber,
      private socialSharing: SocialSharing,
      private alertController: AlertController,
      private actionSheetController: ActionSheetController,
      private modalController: ModalController) { }

  async ngOnInit () {
    this.get_data (null);
  }

  async get_data (event: any) {
    let loading: any;
    if (event === null) {
      loading = await this.loadingController.create({
        message: this.api.get_translate ('Procesando...')
      });

      await loading.present ();
    }

    this.api.get_cuenta_detalle (this.route.snapshot.paramMap.get ('id')).subscribe ((res: any) => {
      console.log (res);
      this.cuenta = res.cuenta;

      this.grafica_lineal = res.cuenta_grafica;
      this._grafica_lineal = res.cuenta_grafica;

      setTimeout (() => {
        this.dibujar_lineal ();
      }, 250);
      
      if (event !== null) {
        event.target.complete ();
      } else {
        loading.dismiss ();
      }

      if (this.cuenta.plan === '0') {
        this.plan_text = 'Capital Futuro';
      } else if (this.cuenta.plan === '1') {
        this.plan_text = 'Inversión Plus';
      } else if (this.cuenta.plan === '2') {
        this.plan_text = 'Bond Liquid';
      } else if (this.cuenta.plan === '3') {
        this.plan_text = 'Real Estate';
      }
    }, error => {
      console.log (error);
      if (event !== null) {
        event.target.complete ();
      } else {

      }
    });
  }

  draw_filtro_lineal (value: string) {
    this.filtro_lineal = value;
    this.dibujar_lineal ();
  }

  dibujar_lineal () {
    let grafica_value: any [] = [];
    let meses: number = 0;
    this.grafica_lineal = this._grafica_lineal;
    this.grafica_lineal = this.grafica_lineal.sort ((a: any, b: any) => {
      return new Date (b.fecha_filtrar).getTime () - new Date (a.fecha_filtrar).getTime ();
    });

    if (this.filtro_lineal === '3M') {
      meses = 3;
    } else if (this.filtro_lineal === '6M') {
      meses = 6;
    } else if (this.filtro_lineal === '1A') {
      meses = 12;
    } else if (this.filtro_lineal === '3A') {
      meses = 36;
    }

    this.grafica_lineal.forEach ((data: any) => {
      var limit = moment ().subtract (meses, 'months');
      if (limit.diff (moment (data.fecha_filtrar)) < 0) {
        grafica_value.push ([
          moment (data.fecha_filtrar).format ('MMM[, ]YYYY'),
          parseFloat (data.monto)
        ]);
      }
    });

    if (grafica_value.length <= 1) {
      grafica_value.unshift ([
        moment ().format ('MMM[, ]YYYY'),
        grafica_value [0][1]
      ]);
    }

    if (this.chart !== null) {
      this.chart.data (grafica_value.reverse ());
    } else {
      this.chart = anychart.line (grafica_value.reverse ());
      this.chart.credits (false);

      this.chart.background ().fill ("#222222");
      this.chart.container (document.getElementById ('chartContainer'));
      this.chart.normal ().stroke ("#ff6600", 2).markers (true);
      this.chart.hovered ().stroke ("#ff6600", 5);
      this.chart.selected ().stroke ("#ff6600", 8);

      this.chart.yAxis ().title("USD $");

      this.chart.draw ();
    }

    // Dibujar Pastel
    if (this.cuenta.abc === 'Si') {
      if (this.chart_pie === null) {
        this.chart_pie = anychart.pie ();

        this.chart_pie.palette (["#FF6600"]);
        this.chart_pie.data ([
          [this.api.get_translate ('Acciones'), 100]
        ]);

        this.chart_pie.background ().fill ("#222222");
        this.chart_pie.container (document.getElementById ("chartPieContainer"));
        this.chart_pie.draw ();
      }
    } else {
      ['portafolio_1', 'portafolio_2', 'portafolio_3'].forEach ((portafolio: string) => {
        if (this.cuenta [portafolio] !== null && this.chart_pie_list [portafolio] === null) {
          this.chart_pie_list [portafolio] = anychart.pie ();

          if (this.cuenta [portafolio] === 'Audaz') {
            this.chart_pie_list [portafolio].palette (["#FF6600"]);
            this.chart_pie_list [portafolio].data ([
              [this.api.get_translate ('Acciones'), 100]
            ]);
          } else if (this.cuenta [portafolio] === 'Balanceado') {
            this.chart_pie_list [portafolio].palette (["#FF6600", "#041a7b", "#0C7B00", "#C6C600"]);
            this.chart_pie_list [portafolio].data ([
              [this.api.get_translate ('Acciones'), 65],
              [this.api.get_translate ('Ganancia Fija'), 20],
              [this.api.get_translate ('Propiedad/Infraestructura'), 10],
              [this.api.get_translate ('Efectivo'), 5],
            ]);
          } else if (this.cuenta [portafolio] === 'Conservador') {
            this.chart_pie_list [portafolio].palette(["#FF6600", "#041a7b", "#0C7B00", "#C6C600"]);
            this.chart_pie_list [portafolio].data([
              [this.api.get_translate ('Acciones'), 40],
              [this.api.get_translate ('Ganancia Fija'), 40],
              [this.api.get_translate ('Propiedad/Infraestructura'), 10],
              [this.api.get_translate ('Efectivo'), 10],
            ]);
          } else if (this.cuenta [portafolio] === 'FAANG') {
            this.chart_pie_list [portafolio].palette (["#FF6600"]);
            this.chart_pie_list [portafolio].data ([
                [this.api.get_translate ('Acciones'), 100]
            ]);
          } else if (this.cuenta [portafolio] === 'CJ-DAF') {
            this.chart_pie_list [portafolio].palette([ "#FF6600", "#041a7b", "#0C7B00"]);
            this.chart_pie_list [portafolio].data([
              ["Financiamiento de propiedades comerciales", 35],
              ["Prestamos y acciones", 30],
              ["Liquidez", 35]
            ]);
          } else if (this.cuenta [portafolio] === 'Low VF') {
            this.chart_pie_list [portafolio].palette([ "#FF6600"]);
            this.chart_pie_list [portafolio].data([
              ["Acciones", 100]
            ]);
          }

          this.chart_pie_list [portafolio].background ().fill ("#222222");
          this.chart_pie_list [portafolio].container (document.getElementById (portafolio));
          this.chart_pie_list [portafolio].draw ();
        }
      });
    }
  }

  ver_pdf (pdf: any) {
    if (pdf === null || pdf === undefined || pdf === '') {
      return;
    }

    window.open(encodeURI ('https://portal.cronoxcapital.com.pe/assets-web/cupones-pdf/' + pdf),"_system","location=yes");
  }

  back () {
    this.navController.back ();
  }

  get_data_alternativa (cuenta: any, alt1: string, alt2: string) {
    let returned: string = '';

    if (cuenta [alt1] !== null) {
      returned = cuenta [alt1];
    } else {
      if (cuenta [alt2] !== null) {
        returned = cuenta [alt2];
      }
    }

    return returned;
  }

  go_page (page: string) {
    this.navController.navigateRoot (page);
  }

  get_moment_string (nombre_mes_portafolio: any, format: string) {
    return moment ().set ('month', nombre_mes_portafolio-1).format (format).toUpperCase ();
  }

  get_fecha_vencimiento (cuenta: any) {
    if (cuenta.anio_vencimiento_tc === null || cuenta.mes_vencimiento_tc === null) {
      return '--';
    }

    return cuenta.mes_vencimiento_tc + '/' + cuenta.anio_vencimiento_tc;
  }

  toggle_pago (pago: any) {
    if (pago.visible === null || pago.visible === undefined) {
      pago.visible = true;
    } else {
      pago.visible = !pago.visible;
    }
  }

  link (url: string) {
    window.open (url, '_system');
  }

  async llamar (value: string) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });

    await loading.present ();

    this.callNumber.callNumber (value, true).then (() => {
      loading.dismiss ();
    }, error => {
      loading.dismiss ();
    });
  }

  async email (value: string) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });

    await loading.present ();

    this.socialSharing.shareViaEmail ('', '', [value]).then (() => {
      loading.dismiss ();
    }).catch(() => {
      loading.dismiss ();
    });
  }

  async descargar_estado_cuenta () {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });

    await loading.present ();

    this.api.pdf_resumen_cuenta (this.route.snapshot.paramMap.get ('id')).subscribe (async (res: any) => {
      console.log (res);
      loading.dismiss ();
      this.actionSheet (res);
    }, error => {
      console.log (error);
      loading.dismiss ();
    });
  }

  async actionSheet (res: any) {
    const actionSheet = await this.actionSheetController.create ({
      header: this.api.get_translate ('El documento fue generada correctamente'),
      buttons: [{
        text: this.api.get_translate ('Compartir'),
        icon: 'share-social-outline',
        handler: () => {
          this.compartir (res.url_pdf);
        }
      }, {
        text: this.api.get_translate ('Visualizar'),
        icon: 'eye-outline',
        handler: () => {
          window.open(encodeURI(res.url_pdf),"_system","location=yes");
        }
      }, {
        text: this.api.get_translate ('Cancelar'),
        icon: 'close',
        role: 'cancel'
      }]
    });

    await actionSheet.present ();
  }

  async compartir (url: string) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });

    await loading.present ();

    this.socialSharing.share ('', '', url).then (() => {
      loading.dismiss ();
    }).catch(() => {
      loading.dismiss ();
    });
  }

  get_monto (cuenta: any) {
    let monto = parseFloat (cuenta.valor_portafolio);
    let valor_efectivo = parseFloat (cuenta.valor_efectivo);

    if (valor_efectivo > 0) {
      monto = cuenta.valor_efectivo;
    }

    return monto;
  }

  get_retencion (cuenta: any) {
    let monto = parseFloat (cuenta.valor_rescate);

    if (cuenta.retencion === '1') {
      monto = monto - (monto * 0.05);
    }

    return monto;
  }

  async solicitar_retiro () {
    let componentProps: any;
    if (this.cuenta.plan === '0' || this.cuenta.plan === '1') {
      componentProps = {
        valor_rescate: this.cuenta.valor_rescate,
        nombre_banco_tb: this.cuenta.nombre_banco_tb,
        cci_swift_tb: this.cuenta.cci_swift_tb,
        numero_cuenta_tb: this.cuenta.numero_cuenta_tb,
        titular_cuenta_tb: this.cuenta.titular_cuenta_tb,
        retencion: this.cuenta.retencion,
        plan: this.cuenta.plan,
        id_cuenta: this.route.snapshot.paramMap.get ('id')
      };
    } else if (this.cuenta.plan === '2') {
      componentProps = {
        cupon_disponible: this.cuenta.cupon_disponible,
        gastos_del_fondo_reglamento: this.cuenta.gastos_del_fondo_reglamento,
        monto_retenido: this.cuenta.monto_retenido,
        disponible_efectivo: this.cuenta.disponible_efectivo,
        nombre_banco_tb: this.cuenta.nombre_banco_tb,
        cci_swift_tb: this.cuenta.cci_swift_tb,
        numero_cuenta_tb: this.cuenta.numero_cuenta_tb,
        titular_cuenta_tb: this.cuenta.titular_cuenta_tb,
        plan: this.cuenta.plan,
        id_cuenta: this.route.snapshot.paramMap.get ('id')
      };
    } else if (this.cuenta.plan === '3') {
      
    }

    const modal = await this.modalController.create ({
      component: SolictarRetiroPage,
      swipeToClose: true,
      componentProps: componentProps
    });

    modal.onWillDismiss ().then ((response: any) => {
      if (response.role === 'update') {
        this.get_data (null);
      }
    });

    return await modal.present ();
  }

  segment_change (event: any) {
    console.log (event.detail.value);
    if (event.detail.value === 'resumen') {
      setTimeout (() => {
        this.dibujar_lineal ();
      }, 250);
    } else  {
      this.chart = null;
      this.chart_pie = null;
      this.chart_pie_list = {
        'portafolio_1': null,
        'portafolio_2': null,
        'portafolio_3': null
      };
    }
  }
}
