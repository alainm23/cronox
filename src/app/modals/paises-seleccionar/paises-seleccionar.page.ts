import { Component, OnInit } from '@angular/core';

// Services
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-paises-seleccionar',
  templateUrl: './paises-seleccionar.page.html',
  styleUrls: ['./paises-seleccionar.page.scss'],
})
export class PaisesSeleccionarPage implements OnInit {
  items: any [] = [];
  _items: any [] = [];
  constructor (private modalController: ModalController, private api: ApiService,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Procesando...'
    });

    await loading.present ();

    this.api.get_lista_paises ().subscribe ((res: any) => {
      console.log (res);
      this.items = res.paises;
      this._items = res.paises;

      this.items.unshift ({
        codigo_dos_digitos: "PE",
        codigo_tres_digitos: "PER",
        created_at: null,
        id: 173,
        nombre: "Peru",
        updated_at: null
      });

      loading.dismiss ();
    }, error => {
      console.log (error);
      loading.dismiss ();
    });
  }

  back () {
    this.modalController.dismiss (null, 'close');
  }

  select (item: any) {
    this.modalController.dismiss (item, 'data');
  }
}
