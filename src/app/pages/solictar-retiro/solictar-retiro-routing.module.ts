import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolictarRetiroPage } from './solictar-retiro.page';

const routes: Routes = [
  {
    path: '',
    component: SolictarRetiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolictarRetiroPageRoutingModule {}
