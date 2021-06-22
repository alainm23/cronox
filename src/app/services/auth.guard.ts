import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private storage: Storage,
    private api: ApiService,
    private navController: NavController,
    public menuController: MenuController,
    private router: Router) {}

    canActivate (route: ActivatedRouteSnapshot) {
      return this.storage.get ('USER_ACCESS').then (async (USER_ACCESS: any) => {
        if (USER_ACCESS !== null) {
          const path = route.routeConfig.path;
          this.api.USER_ACCESS = JSON.parse (USER_ACCESS);
          
          if (path === 'home' && this.api.USER_ACCESS.tipo === 'agente') {
            this.navController.navigateRoot ('home-agente');
            return false;
          }
          
          if (this.api.USER_ACCESS.tipo === 'agente') {
            this.menuController.enable (true, 'menu');
          } else {
            this.menuController.enable (false, 'menu');
          }

          return true;
        } else {
          this.menuController.enable (false, 'menu');
          this.navController.navigateRoot ('inicio-selector');
          return false;
        }
      });
    }
}
