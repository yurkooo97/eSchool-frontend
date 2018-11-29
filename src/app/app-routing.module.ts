import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './login/login/login.guard';
import { ShellGuard } from './shell/shell.guard';

const routes: Routes = [
  {
    path: 'login',
    canLoad: [LoginGuard],
    loadChildren: './login/login.module#LoginModule'
  },
  {
    canLoad: [ShellGuard],
    canActivate: [ShellGuard],
    path: 'shell',
    loadChildren: './shell/shell.module#ShellModule'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
