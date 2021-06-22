import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  URL_BASE: string;
  USER_ACCESS: any = {
    imagen: '',
    rol: 'agente'
  };
  
  LANGS: any [] = ['es', 'en', 'pt'];
  CURRENT_LANG: string = '';
  TRANSLATIONS: Map<string, any> = new Map <string, any> ();
  PAISES: any [] = [];
  private usuario_subject = new Subject<any> ();
  constructor (public http: HttpClient, private translateService: TranslateService,
    private storage: Storage) {
     this.URL_BASE = "https://portal.cronoxcapital.com.pe/api";
  }

  usuario_changed (data: any) {
    this.usuario_subject.next (data);
  }

  get_usuario_observable (): Subject<any> {
    return this.usuario_subject;
  }
  
  login (tipo: string, email: string, password: string) {
    let url = this.URL_BASE + '/auth/login-' + tipo;
    return this.http.post (url, {email: email, password: password});
  }

  logout () {
    let url = this.URL_BASE + '/auth/logout';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }
  
  get_user (access_token: string, tipo: string) {
    let url = this.URL_BASE + '/auth/user';

    const headers = {
      'Authorization': 'Bearer ' + access_token
    };

    return this.http.get (url, { headers });
  }

  get_agente (access_token: string, id_agente: string) {
    let url = this.URL_BASE + '/auth/info-agente';

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

  get_otras_inversiones () {
    let url = this.URL_BASE + '/user/otras-inversiones';

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

  actualizar_perfil_agente (data: any) {
    let url = this.URL_BASE + '/agente/actualizar-datos'

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  // Agente
  get_tramites (tipo: string) {
    let url = this.URL_BASE + '/agente/tramites-' + tipo + '/' + this.USER_ACCESS.id;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  // Capital futuro
  editar_capital_futuro (id_cuenta: string) {
    let url = this.URL_BASE + '/agente/edit-capital-futuro/' + id_cuenta;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  generate_id_capital_futuro () {
    let url = this.URL_BASE + '/agente/nuevo-tramite-capital-futuro/' + this.USER_ACCESS.id;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  guardar_capital_futuro_participe (data: any) {
    let url = this.URL_BASE + '/agente/guardar-capital-futuro-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  guardar_capital_futuro_aporte_participe (data: any) {
    let url = this.URL_BASE + '/agente/guardar-capital-futuro-aporte-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  guardar_capital_futuro_portafolio (data: any) {
    let url = this.URL_BASE + '/agente/guardar-capital-futuro-portafolio';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  guardar_capital_futuro_documentos (data: any) {
    let url = this.URL_BASE + '/agente/guardar-capital-futuro-documentos';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  eliminar_tramite (plan: string, id_cuenta: string) {
    let url = this.URL_BASE;

    if (plan === '0') {
      url += '/agente/eliminar-capital-futuro/' + id_cuenta;
    } else if (plan === '1') {
      url += '/agente/eliminar-inversion-plus/' + id_cuenta;
    } else if (plan === '2') {
      url += '/agente/eliminar-bond-liquid/' + id_cuenta;
    } else if (plan === '3') {
      url += '/agente/eliminar-real-estate/' + id_cuenta;
    }

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  validar_capital_futuro_participe (data: any) {
    let url = this.URL_BASE + '/agente/validar-capital-futuro-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_capital_futuro_aporte (data: any) {
    let url = this.URL_BASE + '/agente/validar-capital-futuro-aporte-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_capital_futuro_portafolio (data: any) {
    let url = this.URL_BASE + '/agente/validar-capital-futuro-portafolio';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_capital_futuro_documentos (data: any) {
    let url = this.URL_BASE + '/agente/validar-capital-futuro-documentos';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  // Inversion Plus
  generate_id_inversion_plus () {
    let url = this.URL_BASE + '/agente/nuevo-tramite-inversion-plus/' + this.USER_ACCESS.id;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  editar_inversion_plus (id_cuenta: string) {
    let url = this.URL_BASE + '/agente/edit-inversion-plus/' + id_cuenta;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  guardar_inversion_plus_participe (data: any) {
    let url = this.URL_BASE + '/agente/guardar-inversion-plus-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  guardar_inversion_plus_aporte_participe (data: any) {
    let url = this.URL_BASE + '/agente/guardar-inversion-plus-aporte-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  guardar_inversion_plus_portafolio (data: any) {
    let url = this.URL_BASE + '/agente/guardar-inversion-plus-portafolio';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }
  
  guardar_inversion_plus_documentos (data: any) {
    let url = this.URL_BASE + '/agente/guardar-inversion-plus-documentos';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_inversion_plus_participe (data: any) {
    let url = this.URL_BASE + '/agente/validar-inversion-plus-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_inversion_plus_aporte (data: any) {
    let url = this.URL_BASE + '/agente/validar-inversion-plus-aporte-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_inversion_plus_portafolio (data: any) {
    let url = this.URL_BASE + '/agente/validar-inversion-plus-portafolio';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_inversion_plus_documentos (data: any) {
    let url = this.URL_BASE + '/agente/validar-inversion-plus-documentos';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  // bond liquid
  generate_id_bond_liquid () {
    let url = this.URL_BASE + '/agente/nuevo-tramite-bond-liquid/' + this.USER_ACCESS.id;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  editar_bond_liquid (id_cuenta: string) {
    let url = this.URL_BASE + '/agente/edit-bond-liquid/' + id_cuenta;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  guardar_bond_liquid_participe (data: any) {
    let url = this.URL_BASE + '/agente/guardar-bond-liquid-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  guardar_bond_liquid_aporte_participe (data: any) {
    let url = this.URL_BASE + '/agente/guardar-bond-liquid-aporte-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  guardar_bond_liquid_documentos (data: any) {
    let url = this.URL_BASE + '/agente/guardar-bond-liquid-documentos';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_bond_liquid_participe (data: any) {
    let url = this.URL_BASE + '/agente/validar-bond-liquid-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_bond_liquid_aporte (data: any) {
    let url = this.URL_BASE + '/agente/validar-bond-liquid-aporte-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_bond_liquid_documentos (data: any) {
    let url = this.URL_BASE + '/agente/validar-bond-liquid-documentos';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  // Real State
  generate_id_real_estate () {
    let url = this.URL_BASE + '/agente/nuevo-tramite-real-estate/' + this.USER_ACCESS.id;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  editar_real_estate (id_cuenta: string) {
    let url = this.URL_BASE + '/agente/edit-real-estate/' + id_cuenta;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  guardar_real_estate_participe (data: any) {
    let url = this.URL_BASE + '/agente/guardar-real-estate-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  guardar_real_estate_aporte_participe (data: any) {
    let url = this.URL_BASE + '/agente/guardar-real-estate-aporte-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  guardar_real_estate_documentos (data: any) {
    let url = this.URL_BASE + '/agente/guardar-real-estate-documentos';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_real_estate_participe (data: any) {
    let url = this.URL_BASE + '/agente/validar-real-estate-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_real_estate_aporte (data: any) {
    let url = this.URL_BASE + '/agente/validar-real-estate-aporte-participe';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  validar_real_estate_documentos (data: any) {
    let url = this.URL_BASE + '/agente/validar-real-estate-documentos';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  // Cuentas
  cuentas_listado () {
    let url = this.URL_BASE + '/agente/cuentas/listado/' + this.USER_ACCESS.id;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  get_aportes_pendientes () {
    let url = this.URL_BASE + '/agente/cuentas/aportes-pendientes/' + this.USER_ACCESS.id;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  nuevo_tramite_cliente (plan: number, id_cuenta: number) {
    let url = this.URL_BASE;
    
    if (plan === 0) {
      url += '/agente/nuevo-tramite-capital-futuro-cliente/' + id_cuenta + '/' + this.USER_ACCESS.id;
    } else if (plan === 1) {
      url += '/agente/nuevo-tramite-inversion-plus-cliente/' + id_cuenta + '/' + this.USER_ACCESS.id;
    } else if (plan === 2) {
      url += '/agente/nuevo-tramite-bond-liquid-cliente/' + id_cuenta + '/' + this.USER_ACCESS.id;
    } else if (plan === 3) {
      url += '/agente/nuevo-tramite-real-estate-cliente/' + id_cuenta + '/' + this.USER_ACCESS.id;
    }

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  // Ilustracion
  generar_pdf_ilustrador (data: any) {
    let lang = this.CURRENT_LANG;
    if (lang === 'pt') {
      lang = 'por';
    }

    data.id_agente = this.USER_ACCESS.id;
    data.lang = lang;

    let url = this.URL_BASE + '/agente/generar-pdf-ilustrador';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  // Comisiones
  get_comisiones_fechas () {
    let url = this.URL_BASE + '/agente/comisiones-fechas/' + this.USER_ACCESS.id;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  download_pdf_liquidacion (fecha_strtotime: number) {
    let lang = this.CURRENT_LANG;
    if (lang === 'pt') {
      lang = 'por';
    }

    let url = this.URL_BASE + '/agente/comisiones/pdf-liquidacion/' +
      fecha_strtotime + '/' + this.USER_ACCESS.id + '/' + lang;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  listado_de_documentos () {
    let url = this.URL_BASE + '/agente/listado-de-documentos';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  get_asesores_listado (idagente: string) {
    let url = this.URL_BASE + '/agente/asesores-listado/' + idagente;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  get_asesores_pendiente (idagente: string) {
    let url = this.URL_BASE + '/agente/asesores/pendientes/' + idagente;

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  invitar_asesor (data: any) {
    data.idpadre = this.USER_ACCESS.id

    let url = this.URL_BASE + '/agente/invitar-asesor';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }

  get_noticias (tipo: string) {
    let url = this.URL_BASE;
    if (tipo === 'user') {
      url += '/user/listar-noticias-usuario';
    } else {
      url += '/agente/listar-noticias-agente';
    }

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  get_noticias_detalle (tipo: string, id: string) {
    let url = this.URL_BASE;
    if (tipo === 'user') {
      url += '/user/detalle-noticia-usuario/' + id;
    } else {
      url += '/agente/detalle-noticia-agente/' + id;
    }

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  recuperar_password (tipo: string, correo: string) {
    let url = this.URL_BASE;
    
    if (tipo === 'user') {
      url += '/auth/recuperar-password-user';
    } else {
      url += '/auth/recuperar-password-user';
    }

    return this.http.post (url, {email: correo});
  }

  get_translate (key: string): string {    
    return this.translateService.instant (key);
  }

  enviar_tramite (plan: string, idcuenta: string) {
    let url = this.URL_BASE;
    if (plan === '0') {
      url += '/agente/enviar-tramite-capital-futuro/' + idcuenta;
    } else if (plan === '1') {
      url += '/agente/enviar-tramite-inversion-plus/' + idcuenta;
    } else if (plan === '2') {
      url += '/agente/enviar-tramite-bond-liquid/' + idcuenta;
    } else if (plan === '3') {
      url += '/agente/enviar-tramite-real-estate/' + idcuenta;
    }

    console.log (url);

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  actualizar_password (tipo: string, contrasena: string, password_new: string, confirmar_contrasena_nueva: string) {
    let url = this.URL_BASE;
    let data: any = {};
    data.contrasena_actual = contrasena;
    data.contrasena_nueva = password_new;
    data.confirmar_contrasena_nueva = confirmar_contrasena_nueva;

    if (tipo === 'user') {
      url += '/user/actualizar-password';
      data.iduser = this.USER_ACCESS.id;
    } else {
      url += '/agente/actualizar-password';
      data.idagente = this.USER_ACCESS.id;
    }

    console.log (url);
    console.log (data);

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, {headers: headers});
  }

  pdf_resumen_cuenta (idcuenta: string) {
    let lang = this.CURRENT_LANG;
    if (lang === 'pt') {
      lang = 'por';
    }

    let url = this.URL_BASE + '/agente/pdf-resumen-cuenta/' + idcuenta + '/' + lang;
    
    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.get (url, { headers });
  }

  solicitar_retiro (data: any) {
    data.idpadre = this.USER_ACCESS.id

    let url = this.URL_BASE + '/user/solicitar-retiro';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    };

    return this.http.post (url, data, { headers });
  }
}
