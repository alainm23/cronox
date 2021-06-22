import { Component, OnInit, Input } from '@angular/core';

// Services
import { FormGroup , FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { NavController, LoadingController, ToastController, AlertController, ActionSheetController, ModalController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-solictar-retiro',
  templateUrl: './solictar-retiro.page.html',
  styleUrls: ['./solictar-retiro.page.scss'],
})
export class SolictarRetiroPage implements OnInit {
  @Input () valor_rescate: string;
  @Input () nombre_banco_tb: string;
  @Input () cci_swift_tb: string;
  @Input () numero_cuenta_tb: string;
  @Input () titular_cuenta_tb: string;
  @Input () retencion: string;
  @Input () plan: string;
  @Input () id_cuenta: string;

  @Input () gastos_del_fondo_reglamento: string;
  @Input () monto_retenido: string;
  @Input () disponible_efectivo: string;

  valor_disponible: number = 0;
  retencion_impuestos: number = 0;
  monto_retirar: number = 0;

  form: FormGroup;

  constructor (private api: ApiService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController) { }

  ngOnInit () {
    if (this.plan === '0' || this.plan === '1') {
      this.valor_disponible = parseFloat (this.valor_rescate);
      if (this.retencion === '1') {
        this.retencion_impuestos = this.valor_disponible * 0.05;
      }
      this.monto_retirar = (this.valor_disponible - this.retencion_impuestos);
    } else if (this.plan === '2') {
      this.monto_retirar = parseFloat (this.disponible_efectivo);
    }

    this.form = new FormGroup ({
      valor_rescate: new FormControl (this.monto_retirar, [Validators.required, Validators.min (1), Validators.max (this.monto_retirar)]),
      nombre_banco_tb: new FormControl (this.nombre_banco_tb, [Validators.required]),
      cci_swift_tb: new FormControl (this.cci_swift_tb, [Validators.required]),
      numero_cuenta_tb: new FormControl (this.numero_cuenta_tb, [Validators.required]),
      titular_cuenta_tb: new FormControl (this.titular_cuenta_tb, [Validators.required]),
      comentario: new FormControl ('')
    });
  }

  async solicitar () {
    if (this.form.valid) {
      const loading = await this.loadingController.create ({
        message: this.api.get_translate ('Procesando...')
      });
  
      await loading.present ();

      console.log (this.form.value);
    
      let request: any = {
        id_cuenta: this.id_cuenta,
        monto_retirar: this.form.value.valor_rescate,
        nombre_banco_tb: this.form.value.nombre_banco_tb,
        numero_cuenta_tb: this.form.value.numero_cuenta_tb,
        titular_cuenta_tb: this.form.value.titular_cuenta_tb,
        cci_swift_tb: this.form.value.cci_swift_tb,
        comentario: this.form.value.comentario
      };

      console.log (request);

      this.api.solicitar_retiro (request).subscribe ((res: any) => {
        console.log (res);
        this.modalController.dismiss (null, 'update').then (() => {
          this.presentToast (this.api.get_translate ('Solicitud enviada correctamente'), 'success');
          loading.dismiss ();
        })
      }, error => {
        loading.dismiss ();
        console.log (error);
      });
    } else {
      console.log (this.form);
      console.log ('Error');
    }
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

  back () {
    this.modalController.dismiss ();
  }
}
