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
    path: 'inicio',
    canActivate: [AuthGuard],
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'inicio-uno',
    canActivate: [AuthGuard],
    loadChildren: () => import('./inicio-uno/inicio-uno.module').then( m => m.InicioUnoPageModule)
  },
  {
    path: 'inicio-dos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./inicio-dos/inicio-dos.module').then( m => m.InicioDosPageModule)
  },
  {
    path: 'inicio-selector',
    loadChildren: () => import('./pages/inicio-selector/inicio-selector.module').then( m => m.InicioSelectorPageModule)
  },
  {
    path: 'login-cliente',
    loadChildren: () => import('./pages/login-cliente/login-cliente.module').then( m => m.LoginClientePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
    path: 'home-asesor',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home-asesor/home-asesor.module').then( m => m.HomeAsesorPageModule)
  },
  {
    path: 'tramite-formulario',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tramite-formulario/tramite-formulario.module').then( m => m.TramiteFormularioPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
