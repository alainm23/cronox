import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  URL_BASE: string;
  USER_ACCESS: any;
  LANGS: any [] = ['es', 'en', 'pt'];

  constructor (public http: HttpClient, private translateService: TranslateService) {
     this.URL_BASE = "https://portal.cronoxcapital.com.pe/api";
  }

  login (email: string, password: string) {
    let url = this.URL_BASE + '/auth/login-user';
    return this.http.post (url, {email: email, password: password});
  }

  logout () {
    let url = this.URL_BASE + '/auth/logout/' + this.USER_ACCESS.tipo;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  get_user (access_token: string, tipo: string) {
    let url = this.URL_BASE + '/auth/user/' + tipo;

    const headers = {
      'Authorization': 'Bearer ' + access_token
    };

    return this.http.get (url, { headers });
  }

  get_cuentas (user_id: number) {
    let url = this.URL_BASE + '/user/listar-cuentas/' + user_id;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  get_cuenta_detalle (cuenta_id: string) {
    let url = this.URL_BASE + '/user/cuenta/' + cuenta_id;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  send_contacto (data: any) {
    let url = this.URL_BASE + '/user/contacto';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  get_lista_paises () {
    let url = this.URL_BASE + '/user/listar-paises';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  actualizar_perfil (data: any) {
    let url = this.URL_BASE + '/user/actualizar-datos-participe'

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }
}
