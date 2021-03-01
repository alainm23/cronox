import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

// Services
import { ApiService } from '../../services/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cuentas: any [] = [];
  loading: boolean = false;
  usuario_nombres: string = '';
  constructor (public api: ApiService, private navController: NavController,
    private storage: Storage) { }

  ngOnInit () {
    this.loading = true;
    this.get_data (null);
  }

  get_data (event: any) {
    this.api.get_cuentas (this.api.USER_ACCESS.id).subscribe ((res: any) => {
      console.log (res);

      this.api.USER_ACCESS.nombres = res.user.nombres;
      this.api.USER_ACCESS.apellidos = res.user.apellidos;
      this.api.USER_ACCESS.celular = res.user.celular;
      this.api.USER_ACCESS.codigo_pais_telf = res.user.codigo_pais_telf;
      this.api.USER_ACCESS.correo = res.user.correo;
      this.api.USER_ACCESS.pais = res.user.pais;
      this.api.USER_ACCESS.id_pais = res.user.id_pais;

      this.storage.set ('USER_ACCESS', JSON.stringify (this.api.USER_ACCESS));

      this.cuentas = res.user.cuentas;
      this.usuario_nombres = res.user.nombres + ' ' + res.user.apellidos;

      if (event !== null) {
        event.target.complete ();
      } else {
        this.loading = false;
      }
    });
  }

  ver_cuenta (cuenta: any) {
    console.log (cuenta);
    this.navController.navigateForward (['cuenta-detalle', cuenta.id]);
    // this.api.get_cuenta_detalle (cuenta.id).subscribe ((res: any) => {
    //   console.log (res);
    // });
  }

  go_page (page: string) {
    this.navController.navigateRoot (page);
  }
}
