import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ModalController, ToastController, AlertController, NavController, ActionSheetController } from '@ionic/angular';
import { FormGroup , FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { PaisesSeleccionarPage } from '../../modals/paises-seleccionar/paises-seleccionar.page';
import { ApiService } from '../../services/api.service';
import { ConstantPool } from '@angular/compiler';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-ilustrador',
  templateUrl: './ilustrador.page.html',
  styleUrls: ['./ilustrador.page.scss'],
})
export class IlustradorPage implements OnInit {
  @ViewChild (IonSlides, { static: false }) slides: IonSlides;
  segment_value: string = '0';
  items: any [] = [
    'Capital Futuro',
    'Inversión Plus',
    'Bond liquid',
    'Real State Fund'
  ];

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 3,
    spaceBetween: 10,
  };

  terminos: number [] = [5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25];
  form: FormGroup;
  constructor (private modalController: ModalController, private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private socialSharing: SocialSharing,
    private navController: NavController,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.form = new FormGroup ({
      nombres: new FormControl (null, [Validators.required]),
      apellidos: new FormControl (null, [Validators.required]),
      pais: new FormControl (null, [Validators.required]),
      pais_nombre: new FormControl (null, [Validators.required]),
      
      moneda: new FormControl (null, [Validators.required]),
      aporte: new FormControl (null, [Validators.required]),
      frecuencia: new FormControl (null, [Validators.required]),
      termino: new FormControl (null, [Validators.required]),
      cupon: new FormControl (null, [Validators.required]),
      utilidad: new FormControl (null, [Validators.required]),
      rendimiento: new FormControl (null, [Validators.required]),
      rendimiento_seleccionado: new FormControl (null, [Validators.required]),
    });
  }

  slidesChanged (event: any) {
    console.log (event);
    this.slides.getActiveIndex ().then ((index) => {
      console.log (index);
    });
  }

  segmentChanged (event: any) {
    this.form.reset ();
  }

  async seleccionar_pais (form: any, value: string, key: string) {
    const modal = await this.modalController.create({
      component: PaisesSeleccionarPage
    });

    modal.onWillDismiss ().then ((response: any) => {
      if (response.role === 'data') {
        form.controls [value].setValue (response.data.nombre);
        form.controls [key].setValue (response.data.id);
      }
    });

    return await modal.present ();
  }

  async submit () {
    let request: any = {};
    request.rproducto = this.segment_value;
    request.pais = this.form.value.pais;
    request.nombres = [this.form.value.nombres];
    request.apellidos = [this.form.value.apellidos];

    if (this.segment_value === '0') {
      request.moneda_capital_futuro = 'USD';
      request.aporte_capital_futuro = this.form.value.aporte;
      request.frecuencia_capital_futuro = this.form.value.frecuencia;
      request.termino_capital_futuro = this.form.value.termino;
      request.rendimiento = 0;
      request.tasa = this.form.value.rendimiento;
      
      if (this.form.value.rendimiento === '-1') {
        request.rendimiento = this.form.value.rendimiento_seleccionado;
      }

      console.log (request);

      if ((request.termino_capital_futuro >= 5 && request.termino_capital_futuro <= 9) && (request.aporte_capital_futuro * request.frecuencia_capital_futuro < 12000)) {
        this.presentToast (this.api.get_translate ('Para un inversión entre 5 y 9 años el aporte no debe ser menor a USD 12.000'), 'danger');
      } else if ((request.termino_capital_futuro >= 10 && request.termino_capital_futuro <= 14) && (request.aporte_capital_futuro * request.frecuencia_capital_futuro < 1200)) {
        this.presentToast (this.api.get_translate ('Para un inversión entre 10 y 14 años el aporte no debe ser menor a USD 1.200'), 'danger');
      } else if (request.aporte_capital_futuro * request.frecuencia_capital_futuro < 600) {
        this.presentToast (this.api.get_translate ('Para un inversión entre 15 y 25 años el aporte no debe ser menor a USD 600'), 'danger');
      } else {
        const loading = await this.loadingController.create ({
          message: this.api.get_translate ('Procesando...')
        });
        await loading.present ();
        
        this.api.generar_pdf_ilustrador (request).subscribe (async (res: any) => {
          loading.dismiss ();    
          this.actionSheet (res);
        }, error => {
          loading.dismiss ();
          console.log (error);
          this.presentToast (this.api.get_translate ('Ingrese todos los campos correctamente'), 'danger');
        });
      }
    } else if (this.segment_value === '1') {
      request.moneda_inversion_plus = 'USD';
      request.aporte_inversion_plus = this.form.value.aporte;
      request.termino_inversion_plus = this.form.value.termino;
      request.rendimiento = 0;
      request.tasa = this.form.value.rendimiento;

      if (request.aporte_inversion_plus < 3000) {
        this.presentToast (this.api.get_translate ('El aporte no puede ser menor a USD 3.000'), 'danger');
      } else {
        const loading = await this.loadingController.create ({
          message: this.api.get_translate ('Procesando...')
        });
        await loading.present ();

        this.api.generar_pdf_ilustrador (request).subscribe (async (res: any) => {
          loading.dismiss ();
          console.log (res);
          this.actionSheet (res);
        }, error => {
          loading.dismiss ();
          console.log (error);
          this.presentToast (this.api.get_translate ('Ingrese todos los campos correctamente'), 'danger');
        });
      }
    } else if (this.segment_value === '2') {
      request.moneda_bond_liquid = 'USD';
      request.aporte_bond_liquid = this.form.value.aporte;
      request.termino_bond_liquid = this.form.value.termino;
      request.interes_bond_liquid = this.form.value.cupon;

      const loading = await this.loadingController.create ({
        message: this.api.get_translate ('Procesando...')
      });
      await loading.present ();
      
      this.api.generar_pdf_ilustrador (request).subscribe (async (res: any) => {
        loading.dismiss ();
        console.log (res);
        this.actionSheet (res);
      }, error => {
        loading.dismiss ();
        console.log (error);
        this.presentToast (this.api.get_translate ('Ingrese todos los campos correctamente'), 'danger');
      });
    } else if (this.segment_value === '3') {
      request.moneda_real_estate = 'USD';
      request.aporte_real_estate = this.form.value.aporte;
      request.termino_real_estate = this.form.value.termino;
      request.interes_real_estate = this.form.value.cupon;
      request.utilidad_real_estate = this.form.value.utilidad;
      request.rendimiento_real_estate = this.form.value.rendimiento;

      const loading = await this.loadingController.create ({
        message: this.api.get_translate ('Procesando...')
      });
      await loading.present ();
      
      this.api.generar_pdf_ilustrador (request).subscribe (async (res: any) => {
        loading.dismiss ();
        console.log (res);
        this.actionSheet (res);
      }, error => {
        loading.dismiss ();
        console.log (error);
        this.presentToast (this.api.get_translate ('Ingrese todos los campos correctamente'), 'danger');
      });
    }
  }

  async actionSheet (res: any) {
    const actionSheet = await this.actionSheetController.create ({
      header: this.api.get_translate ('La ilustracion fue generada correctamente'),
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

  async presentToast (message: any, color: string) {
    const toast = await this.toastController.create ({
      message: message,
      color: color,
      duration: 2000,
      position: 'top'
    });

    toast.present ();
  }

  get_terminos () {
    let returned: any [] = [];

    if (this.segment_value === '0' || this.segment_value === '1') {
      returned = this.terminos;
    } else {
      returned = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }

    return returned;
  }

  go_page (page: string) {
    this.navController.navigateRoot (page);
  }
}
