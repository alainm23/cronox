import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAgentePopoverPage } from './home-agente-popover.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAgentePopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAgentePopoverPageRoutingModule {}
