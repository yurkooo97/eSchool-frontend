import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class LoginGuard implements CanLoad {
	
	constructor(private _authService: AuthenticationService,
							private router: Router) { }
	
		canLoad(route: Route): boolean {
			if (this._authService.loggedIn()) {
				//TODO: get role from user service
				this.router.navigate(['/shell/admin-panel/'])
					return true;
			}
					return true;	
		
		}	
}

	

	



