import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)},
  {path: 'login',loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  {
    path: 'display',
    loadChildren: () => import('./display/display.module').then( m => m.DisplayPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
