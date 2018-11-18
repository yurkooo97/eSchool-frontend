import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AdminGuard implements CanLoad {

  constructor(private _authService: AuthenticationService,
    private router: Router) { }

  canLoad(route: Route): boolean {
    const url: string = route.path;
    if (this._authService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/login/']);
    return false;
  }
}














