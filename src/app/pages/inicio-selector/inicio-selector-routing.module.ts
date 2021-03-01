import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioSelectorPage } from './inicio-selector.page';

const routes: Routes = [
  {
    path: '',
    component: InicioSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioSelectorPageRoutingModule {}
