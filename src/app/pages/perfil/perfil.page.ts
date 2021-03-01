import { Component, OnInit } from '@angular/core';

import { NavController, ModalController, ActionSheetController, LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { PaisesSeleccionarPage } from '../../modals/paises-seleccionar/paises-seleccionar.page';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  form: FormGroup;
  constructor(private navController: NavController,
      private api: ApiService,
      private modalController: ModalController,
      private loadingController: LoadingController,
      private toastController: ToastController,
      public alertController: AlertController,
      public storage: Storage,
      public actionSheetController: ActionSheetController,
      private translateService: TranslateService) { }

  ngOnInit () {
    console.log (this.api.USER_ACCESS);

    this.form = new FormGroup ({
      nombres: new FormControl ({value: this.api.USER_ACCESS.nombres, disabled: true}, [Validators.required]),
      apellidos: new FormControl ({value: this.api.USER_ACCESS.apellidos, disabled: true}, Validators.required),
      celular: new FormControl (this.api.USER_ACCESS.celular, [Validators.required]),
      codigo_pais_telf: new FormControl (this.api.USER_ACCESS.codigo_pais_telf, [Validators.required]),
      correo: new FormControl ({value: this.api.USER_ACCESS.correo, disabled: true}, [Validators.required]),
      pais: new FormControl (this.api.USER_ACCESS.pais, [Validators.required]),
      id_pais: new FormControl (this.api.USER_ACCESS.id_pais, [Validators.required])
    });
  }

  go_page (page: string) {
    this.navController.navigateRoot (page);
  }

  async seleccionar_pais () {
    const modal = await this.modalController.create({
      component: PaisesSeleccionarPage
    });

    modal.onWillDismiss ().then ((response: any) => {
      if (response.role === 'data') {
        this.form.controls ['pais'].setValue (response.data.nombre);
        this.form.controls ['id_pais'].setValue (response.data.id);
      }
    });

    return await modal.present ();
  }

  async submit () {
    const loading = await this.loadingController.create({
      message: 'Procesando...'
    });

    await loading.present ();

    const request: any = {
      id_pais_residencia: this.form.value.id_pais,
      codigo_pais_telf: this.form.value.codigo_pais_telf,
      celular: this.form.value.celular,
      iduser: this.api.USER_ACCESS.id
    };

    console.log (request);

    this.api.actualizar_perfil (request).subscribe ((res: any) => {
      console.log (res);
      loading.dismiss ();
      this.presentToast ('Perfil actualizado correctamente', 'success');
    }, error => {
      console.log (error);
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

  async salir () {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Está seguro que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Si',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Procesando...'
            });

            await loading.present ();

            this.api.logout ().subscribe (async (res: any) => {
              console.log (res);
              await loading.dismiss ();
              this.borrar_user_access ();
            }, async error => {
              console.log (error);
              await loading.dismiss ();
              this.borrar_user_access ();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  borrar_user_access () {
    this.storage.remove ('USER_ACCESS').then (() => {
      this.navController.navigateRoot ('inicio-selector');
    });
  }

  async change_lang () {
    const actionSheet = await this.actionSheetController.create({
      header: 'Idioma',
      mode: 'md',
      buttons: [{
        text: 'Español',
        handler: () => {
          this.set_lang ('es');
        }
      }, {
        text: 'English',
        handler: () => {
          this.set_lang ('en');
        }
      }, {
        text: 'Português',
        handler: () => {
          this.set_lang ('pt');
        }
      }, {
        text: 'Cancelar',
        role: 'cancel'
      }]
    });

    await actionSheet.present ();
  }

  set_lang (lang: string) {
    this.storage.set ('lang', lang);
    moment.locale (lang);
    this.translateService.use (lang);
  }
}
