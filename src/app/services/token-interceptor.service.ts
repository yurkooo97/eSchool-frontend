import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  intercept(req, next) {
    const token = this.authService.getToken();
    if (token == null || token === '') {
      if (this.router.url !== '/login' && this.router.url !== '/login/') {
        this.router.navigate(['/login']);
      }
      return next.handle(req);
    }
    const tokenizedReq = req.clone({
      headers: req.headers.set('Authorization', token)
    });
    return next.handle(tokenizedReq)
      .catch((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401 || errorResponse.status === 400) {
          this.authService.logOut();
          this.router.navigate(['/login']);
        }
        return Observable.throw(errorResponse);

      });
  }
}
