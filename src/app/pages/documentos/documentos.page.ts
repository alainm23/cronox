import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {
  items: any [] = [];
  segment_value: string = 'todas';

  lang: string;
  URL: string = 'http://portal.cronoxcapital.com.pe';

  cuentas: any [] = [
    {
      id: 'Capital_Futuro',
      nombre: 'Capital Futuro',
      visible: true,
    },
    {
      id: 'Inversion_Plus',
      nombre: 'Inversion Plus',
      visible: false
    },
    {
      id: 'Bond_Liquid',
      nombre: 'Bond Liquid',
      visible: false
    },
    {
      id: 'Real_Estate',
      nombre: 'Real Estate',
      visible: false
    }
  ];
  constructor (private api: ApiService,
    private loadingController: LoadingController,
    private storage: Storage,
    private navController: NavController) { }

  async ngOnInit() {
    this.lang = await this.storage.get ('lang');

    const loading = await this.loadingController.create({
      message: ''// this.api.get_translate ('Procesando...')
    });
    await loading.present ();

    this.api.listado_de_documentos ().subscribe ((res: any) => {
      console.log (res);
      loading.dismiss ();
      this.items = res.data.documentos;
    }, error => {
      loading.dismiss ();
      console.log (error);
    });
  }

  segmentChanged (value: any) {
    console.log (value);
  }

  get_documentos (segment_value: string) {
    return this.items.filter ((item: any) => {
      return item.seccion === segment_value;
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

  go_page (page: string) {
    this.navController.navigateRoot (page);
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

  validar_descarga (documento: any) {
    let returned: boolean = false;

    if (this.lang === 'pt') {
      this.lang = 'por';
    }

    if (documento [this.lang] !== undefined && documento [this.lang] !== null) {
      returned = true;
    } else {
      if (documento ['es'] === undefined || documento ['es'] === null) {
        returned = false;
      } else {
        returned = true;
      }
    }

    return returned;
  }

  toggled (cuenta: any) {
    cuenta.visible = !cuenta.visible;
  }
}
