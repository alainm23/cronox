import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

// Services
import { ApiService } from '../../services/api.service';
import { Chart } from 'chart.js';
import 'anychart';
import * as moment from 'moment';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-cuenta-detalle',
  templateUrl: './cuenta-detalle.page.html',
  styleUrls: ['./cuenta-detalle.page.scss'],
})
export class CuentaDetallePage implements OnInit {
  // @ViewChild ('chartContainer', { static: false }) container: ElementRef;
  // @ViewChild ('chartPieContainer', { static: false }) pieContainer: ElementRef;

  chart: anychart.charts.Cartesian = null;
  chart_pie: anychart.charts.Pie = null;

  cuenta: any = {
    abc: 'Si',
    numero_cuenta_tb: '',
    numero_tarjeta_tc: '',
    nombre_banco_tb: '',
    nombre_banco_tc: ''
  };
  segment_value: string = 'resumen';
  filtro_lineal: string = '1A';
  grafica_lineal: any [] = [];
  _grafica_lineal: any [] = [];
  constructor (private api: ApiService,
      private route: ActivatedRoute,
      private navController: NavController,
      private loadingController: LoadingController,
      private callNumber: CallNumber,
      private socialSharing: SocialSharing) { }

  ngOnInit () {
    this.get_data (null);
  }

  get_data (event: any) {
    this.api.get_cuenta_detalle (this.route.snapshot.paramMap.get ('id')).subscribe ((res: any) => {
      console.log (res);
      this.cuenta = res.cuenta;

      this.grafica_lineal = res.cuenta_grafica;
      this._grafica_lineal = res.cuenta_grafica;

      this.dibujar_lineal ();
      if (event !== null) {
        event.target.complete ();
      } else {

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

    console.log (grafica_value)

    // Dibujar Pastel
    if (this.chart_pie === null) {
      this.chart_pie = anychart.pie ();
      if (this.cuenta.abc === 'Si') {
        this.chart_pie.palette (["#FF6600"]);
        this.chart_pie.data ([
          ["Acciones", 100]
        ]);
      } else if (this.cuenta.portafolio_1 !== null && this.cuenta.portafolio_2 !== null && this.cuenta.portafolio_3 !== null) {
        if (this.cuenta.portafolio_1 === 'Audaz') {
          this.chart_pie.palette (["#FF6600"]);
          this.chart_pie.data ([
              ["Acciones", 100]
          ]);
        } else if (this.cuenta.portafolio_1 === 'Balanceado') {
          this.chart_pie.palette (["#FF6600", "#041a7b", "#0C7B00", "#C6C600"]);
          this.chart_pie.data ([
              ["Acciones", 65],
              ["Ganancia Fija", 20],
              ["Propiedad/Infraestructura", 10],
              ["Efectivo", 5],
          ]);
        } else if (this.cuenta.portafolio_1 === 'Conservador') {
          this.chart_pie.palette(["#FF6600", "#041a7b", "#0C7B00", "#C6C600"]);
          this.chart_pie.data([
              ["Acciones", 40],
              ["Ganancia Fija", 40],
              ["Propiedad/Infraestructura", 10],
              ["Efectivo", 10],
          ]);
        }
      }

      this.chart_pie.background ().fill ("#222222");
      this.chart_pie.container (document.getElementById ('chartPieContainer'));

      this.chart_pie.draw ();
    }

    if (this.chart === null) {
      this.chart = anychart.line (grafica_value.reverse ());
      this.chart.credits (false);

      this.chart.background ().fill ("#222222");
      this.chart.container (document.getElementById ('chartContainer'));
      this.chart.normal ().stroke ("#ff6600", 2).markers (true);
      this.chart.hovered ().stroke ("#ff6600", 5);
      this.chart.selected ().stroke ("#ff6600", 8);

      this.chart.yAxis ().title("USD $");

      this.chart.draw ();
    } else {
      this.chart.data (grafica_value.reverse ());
    }
  }

  back () {
    console.log ('back');
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

  get_moment_string (val: number, format: string) {
    return moment ().subtract (val, 'month').format (format).toUpperCase ();
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

  llamar (value: string) {
    this.callNumber.callNumber (value, true).then (() => {

    }, error => {

    });
  }

  email (value: string) {
    this.socialSharing.shareViaEmail ('', '', [value]).then (() => {

    }).catch(() => {

    });
  }
}
