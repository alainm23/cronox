import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InversionesOtrasPage } from './inversiones-otras.page';

const routes: Routes = [
  {
    path: '',
    component: InversionesOtrasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InversionesOtrasPageRoutingModule {}
