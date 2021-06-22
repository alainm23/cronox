import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { PaisesSeleccionarPage } from 'src/app/modals/paises-seleccionar/paises-seleccionar.page';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-invitar-agente',
  templateUrl: './invitar-agente.page.html',
  styleUrls: ['./invitar-agente.page.scss'],
})
export class InvitarAgentePage implements OnInit {
  form: FormGroup;
  constructor (public modalController: ModalController,
    public loadingController: LoadingController,
    public api: ApiService,
    public toastController: ToastController,
    public navController: NavController) { }

  ngOnInit () {
    this.form = new FormGroup ({
      nombres: new FormControl (null, [Validators.required]),
      apellidos: new FormControl (null, [Validators.required]),
      email: new FormControl (null, [Validators.required]),
      tipo_documento: new FormControl (null, [Validators.required]),
      nro_documento: new FormControl (null, [Validators.required]),
      direccion_domicilio: new FormControl (null, [Validators.required]),
      telefono: new FormControl (null, [Validators.required]),
      pais_id: new FormControl (null, [Validators.required]),
      pais: new FormControl (null, [Validators.required]),
      ciudad: new FormControl (null, [Validators.required]),
      rol: new FormControl (null, [Validators.required]),
    });
  }

  async seleccionar_pais (value: string, key: string) {
    const modal = await this.modalController.create({
      component: PaisesSeleccionarPage
    });

    modal.onWillDismiss ().then ((response: any) => {
      if (response.role === 'data') {
        this.form.controls [value].setValue (response.data.nombre);
        this.form.controls [key].setValue (response.data.id);
      }
    });

    return await modal.present ();
  }

  async submit () {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Procesando...')
    });
    await loading.present ();

    this.api.invitar_asesor (this.form.value).subscribe ((res: any) => {
      console.log (res);
      loading.dismiss ();
      this.presentToast (
        this.api.get_translate ('La invitacion se envio correctamente'), 'success'
      );
      this.navController.navigateBack (['asesores', 'pendiente']);
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
}
