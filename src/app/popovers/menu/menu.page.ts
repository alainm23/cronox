import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @Input () items: any [] = [];

  constructor (public popoverController: PopoverController) { }

  ngOnInit() {
  }

  select (item: any) {
    this.popoverController.dismiss (item, 'ok');
  }
}
