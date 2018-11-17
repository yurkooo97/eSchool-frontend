import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
      'Access-Control-Allow-Headers': 'accept, content-type'
    })
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  intercept(req, next) {
    req = req.clone(this.httpOptions);
    const token = this.authService.getToken();
    if (token == null) {
      if (this.router.url !== '/login' && this.router.url !== '/login/') {
        this.router.navigate(['/login']);
      }
      return next.handle(req);
    }
    const tokenizedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    console.log(req);
    return next.handle(tokenizedReq);
  }
}
