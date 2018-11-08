import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { AuthenticationService} from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

	constructor(private authService: AuthenticationService) { }
	
	intercept(req, next) {
		const token = this.authService.getToken();
		if (token == null) {
			return next.handle(req);
		}
		const tokenizedReq = req.clone({
			headers: req.headers.set('Authorization', `Bearer ${token}`)
		})
		return next.handle(tokenizedReq)
	}
}
