import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio-selector',
  templateUrl: './inicio-selector.page.html',
  styleUrls: ['./inicio-selector.page.scss'],
})
export class InicioSelectorPage implements OnInit {

  constructor (private navController: NavController) { }

  ngOnInit() {
  }

  login_cliente () {
    this.navController.navigateForward ('login-cliente');
  }
}
