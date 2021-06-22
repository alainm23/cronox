import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { first, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asesores',
  templateUrl: './asesores.page.html',
  styleUrls: ['./asesores.page.scss'],
})
export class AsesoresPage implements OnInit {
  item: any = {
    asesores: []
  };

  asesores: any [] = [];
  _asesores: any [] = [];
  rol: string = 'cronox';
  segment_value: string = 'todas';
  constructor (private navController: NavController, private api: ApiService,
    private loadingController: LoadingController,
    private route: ActivatedRoute) { }

  async ngOnInit () {
    this.segment_value = this.route.snapshot.paramMap.get ('segment_value');
    this.segmentChanged (this.segment_value)
  }

  async segmentChanged (tipo: string) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });

    await loading.present ();

    if (tipo === 'todas') {
      if (this.api.USER_ACCESS.rol !== 'Asesor') {
        this.api.get_asesores_listado (this.api.USER_ACCESS.id).subscribe ((res: any) => {
          console.log (res);
          this.asesores = res.data.asesores;
          this._asesores = res.data.asesores;
          loading.dismiss ();
        }, error => {
          console.log (error);
          loading.dismiss ();
        });
      }
    } else {
      this.api.get_asesores_pendiente (this.api.USER_ACCESS.id).subscribe ((res: any) => {
        console.log (res);
        this.asesores = res.asesores;
        this._asesores = res.asesores;
        loading.dismiss ();
      }, error => {
        console.log (error);
        loading.dismiss ();
      });
    }
  }

  invitar () {
    this.navController.navigateForward ('invitar-agente');
  }

  go_page (page: string) {
    this.navController.navigateRoot (page);
  }

  search (search_text: string) {
    this.asesores = this._asesores;

    if (search_text !== '') {
      this.asesores = this.asesores.filter ((item: any) => {
        return (item.nombres.toLowerCase ().indexOf (search_text.toLowerCase ()) > -1) ||
        (item.apellidos.toLowerCase ().indexOf (search_text.toLowerCase ()) > -1); 
      });
    }
  }
}
