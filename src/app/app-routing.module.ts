import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicio-selector',
    loadChildren: () => import('./pages/inicio-selector/inicio-selector.module').then( m => m.InicioSelectorPageModule)
  },
  {
    path: 'login/:tipo',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cuenta-detalle/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/cuenta-detalle/cuenta-detalle.module').then( m => m.CuentaDetallePageModule)
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'noticias',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'contacto',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'paises-seleccionar',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modals/paises-seleccionar/paises-seleccionar.module').then( m => m.PaisesSeleccionarPageModule)
  },
  {
    path: 'home-agente',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home-agente/home-agente.module').then( m => m.HomeAgentePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'tramites/:segment_value',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tramites/tramites.module').then( m => m.TramitesPageModule)
  },
  {
    path: 'tramite-detalle/:id/:tipo/:edit',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tramite-detalle/tramite-detalle.module').then( m => m.TramiteDetallePageModule)
  },
  {
    path: 'home-agente-popover',
    loadChildren: () => import('./popovers/home-agente-popover/home-agente-popover.module').then( m => m.HomeAgentePopoverPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./popovers/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'asesores/:segment_value',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/asesores/asesores.module').then( m => m.AsesoresPageModule)
  },
  {
    path: 'invitar-agente',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/invitar-agente/invitar-agente.module').then( m => m.InvitarAgentePageModule)
  },
  {
    path: 'ilustrador',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/ilustrador/ilustrador.module').then( m => m.IlustradorPageModule)
  },
  {
    path: 'comisiones',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/comisiones/comisiones.module').then( m => m.ComisionesPageModule)
  },
  {
    path: 'documentos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/documentos/documentos.module').then( m => m.DocumentosPageModule)
  },
  {
    path: 'noticia-detalle/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/noticia-detalle/noticia-detalle.module').then( m => m.NoticiaDetallePageModule)
  },
  {
    path: 'inversiones-otras',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/inversiones-otras/inversiones-otras.module').then( m => m.InversionesOtrasPageModule)
  },
  {
    path: 'solictar-retiro',
    loadChildren: () => import('./modals/solictar-retiro/solictar-retiro.module').then( m => m.SolictarRetiroPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
