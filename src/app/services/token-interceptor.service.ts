import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { AuthenticationService} from './authentication.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
	
	constructor(private authService: AuthenticationService,
		private router: Router) { }
	
	intercept(req, next) {
		const token = this.authService.getToken();
		if (token == null) {
			if (this.router.url !== '/login' && this.router.url !== '/login/') {
				this.router.navigate(['/login']);
			}
			return next.handle(req);
		}
		const tokenizedReq = req.clone({
			headers: req.headers.set('Authorization', `Bearer ${token}`)
		})
		return next.handle(tokenizedReq)
	}
}
