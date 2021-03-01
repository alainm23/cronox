import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  constructor (private navController: NavController) { }

  ngOnInit() {
  }

  go_page (page: string) {
    this.navController.navigateRoot (page);
  }
}
