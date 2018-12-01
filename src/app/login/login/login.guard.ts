import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';


@Injectable()
export class LoginGuard implements CanLoad, CanActivate {

  constructor(private _authService: AuthenticationService,
    private router: Router) { }

  canLoad(): boolean {
    if (this._authService.loggedIn()) {
      this.router.navigate([this._authService.defaultRoute()]);
      return true;
    }
    return true;
  }
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      this.router.navigate([this._authService.defaultRoute()]);
      return true;
    }
    return true;
  }
}
