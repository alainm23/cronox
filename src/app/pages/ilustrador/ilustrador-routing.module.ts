import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IlustradorPage } from './ilustrador.page';

const routes: Routes = [
  {
    path: '',
    component: IlustradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IlustradorPageRoutingModule {}
