import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  form: FormGroup;
  constructor (private navController: NavController,
      private api: ApiService,
      private loadingController: LoadingController,
      private toastController: ToastController) { }

  ngOnInit () {
    this.form = new FormGroup ({
      nombre: new FormControl ('', [Validators.required]),
      asunto: new FormControl ('', [Validators.required]),
      mensaje: new FormControl ('', [Validators.required]),
      email: new FormControl ('', Validators.required)
    });
  }

  go_page (page: string) {
    this.navController.navigateRoot (page);
  }

  async submit () {
    const loading = await this.loadingController.create({
      message: 'Procesando...'
    });

    await loading.present ();

    const request: any = {
      nombre: this.form.value.nombre,
      correo: this.form.value.email,
      asunto: this.form.value.asunto,
      mensaje: this.form.value.mensaje,
      tipo: 'usuario'
    };

    this.api.send_contacto (request).subscribe ((res: any) => {
      console.log (res);
      loading.dismiss ();
      this.presentToast ('El mensaje se envio correctamente', 'success');
      this.form.reset ();
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
