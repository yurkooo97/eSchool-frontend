import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class LoginGuard implements CanLoad {

  constructor(private _authService: AuthenticationService,
    private router: Router) { }

  canLoad(): boolean {
    if (this._authService.loggedIn()) {
      let route: string;
      const role = this._authService.getRole();
      switch (role) {
        case 'ROLE_ADMIN':
          route = '/shell/admin-panel/';
          break;
        case 'ROLE_TEACHER':
          route = '/shell/journal';
          break;
        case 'ROLE_USER':
          route = '/shell/';
          break;
      }
      this.router.navigate([route]);
      return true;
    }
    return true;
  }
}




