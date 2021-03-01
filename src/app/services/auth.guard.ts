import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private storage: Storage,
    private api: ApiService,
    private navController: NavController) {}

    canActivate () {
      return this.storage.get ('USER_ACCESS').then (async (USER_ACCESS: any) => {
        if (USER_ACCESS !== null) {
          this.api.USER_ACCESS = JSON.parse (USER_ACCESS);
          return true;
        } else {
          this.navController.navigateRoot ('inicio-selector');
          return false;
        }
      });
    }
}
