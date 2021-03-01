import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioUnoPage } from './inicio-uno.page';

const routes: Routes = [
  {
    path: '',
    component: InicioUnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioUnoPageRoutingModule {}
