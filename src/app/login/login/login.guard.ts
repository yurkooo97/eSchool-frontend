import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class LoginGuard implements CanLoad {

  constructor(private _authService: AuthenticationService,
    private router: Router) { }

  canLoad(): boolean {
    if (this._authService.loggedIn()) {
      this.router.navigate([this._authService.defaultRoute()]);
      return true;
    }
    return true;
  }
}




