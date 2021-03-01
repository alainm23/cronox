import { Component, OnInit } from '@angular/core';

// Services
import { ApiService } from '../../services/api.service';
import { Storage } from '@ionic/storage';

// Forms
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.page.html',
  styleUrls: ['./login-cliente.page.scss'],
})
export class LoginClientePage implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  show_password: boolean = false;
  type_password: string = 'password';
  constructor (public api: ApiService,
      private storage: Storage,
      private navController: NavController) {

  }

  ngOnInit () {
    this.form = new FormGroup ({
      email: new FormControl ('carlos@assethc.com', [Validators.required, Validators.email]),
      password: new FormControl ('secret2020', Validators.required)
    });
  }

  submit () {
    this.loading = true;
    this.api.login (this.form.value.email, this.form.value.password).subscribe ((res: any) => {
      console.log (res);

      const USER_ACCESS: any = {
        access_token: res.access_token,
        expires_at: res.expires_at
      };

      this.api.get_user (USER_ACCESS.access_token, 'user').subscribe ((res: any) => {
        this.loading = false;

        USER_ACCESS.correo = res.user.email;
        USER_ACCESS.apellidos = res.user.apellidos;
        USER_ACCESS.nombres = res.user.nombres;
        USER_ACCESS.imagen = res.user.imagen;
        USER_ACCESS.id = res.user.id;
        USER_ACCESS.fecha_nacimiento = res.user.fecha_nacimiento;
        USER_ACCESS.tipo = 'user';

        this.api.USER_ACCESS = USER_ACCESS;
        this.storage.set ('USER_ACCESS', JSON.stringify (USER_ACCESS)).then (() => {
          this.navController.navigateRoot ('home');
        });
      }, error => {
        console.log ('get_user', error);
        this.loading = false;
      });
    }, error => {
      console.log ('login', error);
      this.loading = false;
    });
  }

  password_toggled () {
    if (this.type_password === 'password') {
      this.type_password = 'text';
    } else {
      this.type_password = 'password';
    }
  }
}
