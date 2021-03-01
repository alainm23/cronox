import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioDosPage } from './inicio-dos.page';

const routes: Routes = [
  {
    path: '',
    component: InicioDosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioDosPageRoutingModule {}
