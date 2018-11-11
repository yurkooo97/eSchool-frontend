import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './admin-panel/admin.guard';
import { LoginGuard} from './login/login/login.guard'


const routes: Routes = [
  {
		path: 'login',
		canLoad: [LoginGuard],
    loadChildren: './login/login.module#LoginModule'
  },
  {
		path: 'shell',
		canLoad: [AdminGuard],
		loadChildren: './shell/shell.module#ShellModule',
		
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
