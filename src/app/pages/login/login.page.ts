import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  show_password: boolean = false;
  type_password: string = 'password';
  tipo: string;
  constructor (public api: ApiService,
      private storage: Storage,
      private navController: NavController,
      private alertController: AlertController,
      private route: ActivatedRoute,
      private loadingController: LoadingController,
      private toastController: ToastController) {

  }

  ngOnInit () {
    this.tipo = this.route.snapshot.paramMap.get ('tipo');
    console.log (this.tipo);

    this.form = new FormGroup ({
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', Validators.required)
    });
  }

  submit () {
    this.loading = true;

    this.api.login (this.tipo, this.form.value.email, this.form.value.password).subscribe ((login_data: any) => {
      console.log ('login', login_data);

      const USER_ACCESS: any = {
        access_token: login_data.access_token,
        expires_at: login_data.expires_at
      };

      if (this.tipo === 'user') {
        this.api.get_user (USER_ACCESS.access_token, this.tipo).subscribe ((res: any) => {  
          this.loading = false;
  
          USER_ACCESS.correo = res.user.email;
          USER_ACCESS.apellidos = res.user.apellidos;
          USER_ACCESS.nombres = res.user.nombres;
          USER_ACCESS.imagen = res.user.imagen;
          USER_ACCESS.id = res.user.id;
          USER_ACCESS.fecha_nacimiento = res.user.fecha_nacimiento;
          USER_ACCESS.tipo = this.tipo;
  
          this.api.USER_ACCESS = USER_ACCESS;

          this.storage.set ('USER_ACCESS', JSON.stringify (USER_ACCESS)).then (() => {
            this.api.usuario_changed (this.api.USER_ACCESS);
            if (this.tipo === 'user') {
              this.navController.navigateRoot ('home');
            } else {
              this.navController.navigateRoot ('home-agente');
            }
          });
        }, error => {
          this.loading = false;
          this.presentToast (error.error.message, 'danger');
        });
      } else {
        this.api.get_agente (USER_ACCESS.access_token, login_data.id_agente).subscribe ((res: any) => {  
          this.loading = false;
  
          USER_ACCESS.correo = res.user.email;
          USER_ACCESS.apellidos = res.user.apellidos;
          USER_ACCESS.nombres = res.user.nombres;
          USER_ACCESS.imagen = res.imagen;
          USER_ACCESS.id = res.user.id;
          USER_ACCESS.fecha_nacimiento = res.user.fecha_nacimiento;
          USER_ACCESS.tipo = this.tipo;
          USER_ACCESS.rol = res.rol;
          USER_ACCESS.telefono = res.user.telefono
  
          this.api.USER_ACCESS = USER_ACCESS;

          this.storage.set ('USER_ACCESS', JSON.stringify (USER_ACCESS)).then (() => {
            this.api.usuario_changed (this.api.USER_ACCESS);
            if (this.tipo === 'user') {
              this.navController.navigateRoot ('home');
            } else {
              this.navController.navigateRoot ('home-agente');
            }
          });
        }, error => {
          console.log (error);
          this.loading = false;
          this.presentToast (error.error.message, 'danger');
        });
      }
    }, error => {
      console.log ('login', error);
      this.loading = false;
      this.presentToast (this.api.get_translate ('Los datos ingresados no coinciden con ningun usuario'), 'danger')
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

  password_toggled () {
    if (this.type_password === 'password') {
      this.type_password = 'text';
    } else {
      this.type_password = 'password';
    }
  }

  async recuperar () {
    const alert = await this.alertController.create({
      header: this.api.get_translate ('Recuperar contraseña'),
      message: this.api.get_translate ('Ingrese el correo electrónico con el que te registraste en la plataforma'),
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: this.api.get_translate ('Correo electrónico')
        }
      ],
      buttons: [
        {
          text: this.api.get_translate ('Cancelar'),
          role: 'cancel'
        }, {
          text: this.api.get_translate ('Confirmar'),
          handler: (data: any) => {
            if (data.email.trim () != "") {
              this.validar_olvido_correo (data.email.trim ());
            } else {
              this.alert_message (this.api.get_translate ('Ingrese un correo valido'));
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async validar_olvido_correo (email: string) {
    const loading = await this.loadingController.create({
      message: this.api.get_translate ('Verificando...'),
    });

    await loading.present ();

    this.api.recuperar_password (this.tipo, email).subscribe ((res: any) => {
      console.log (res);
      loading.dismiss ();
      this.alert_message (this.api.get_translate ('Acabamos de enviarle un email con los pasos necesarios para que restablezcas tu contraseña. (Revisa también tu bandeja de no deseado)'));
    }, error => {
      loading.dismiss ();
      console.log (error);
      this.alert_message (this.api.get_translate ('Lo sentimos el correo ingresado no esta registrado en el sistema.'));
    })
  }

  async alert_message (message: string) {
    const alert = await this.alertController.create({
      header: this.api.get_translate ('Usuario encontrado'),
      message: message,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }
}
