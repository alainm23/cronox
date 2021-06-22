import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitarAgentePage } from './invitar-agente.page';

const routes: Routes = [
  {
    path: '',
    component: InvitarAgentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvitarAgentePageRoutingModule {}
