import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public Url = 'signin';
  private refreshUrl = 'refresh';
  private tokenRefreshMinPeriod: number;
  private tokenRefreshTimestamp: number;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.tokenRefreshMinPeriod = 1000 * 60 * 5;
  }

  login(userName: string, password: string) {
    const userData = { username: userName, password: password };
    return this.httpClient
      .post(this.Url, userData, { observe: 'response' })
      .map((response: any) => {
        if (response.status === 204) {
          this.tokenRefreshTimestamp = new Date().getTime();
          localStorage.setItem(
            'authToken',
            response.headers.get('Authorization')
          );
        }
        return response;
      });
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  logOut() {
    this.tokenRefreshTimestamp = null;
    localStorage.removeItem('authToken');
  }

  loggedIn() {
    return !!localStorage.getItem('authToken');
  }

  getRole(): string {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return null;
    }
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);
    return decodedToken.Roles.authority;
  }

  defaultRoute() {
    let route: string;
    const role = this.getRole();
    switch (role) {
      case 'ROLE_ADMIN':
        route = '/shell/admin-panel/';
        break;
      case 'ROLE_TEACHER':
        route = '/shell/journal';
        break;
      case 'ROLE_USER':
        route = '/shell/student-book';
        break;
    }
    return route;
  }

  isAdmin() {
    return this.getRole() === 'ROLE_ADMIN';
  }

  refreshToken() {
    if (!this.loggedIn()) {
      return;
    }
    const curTime = new Date().getTime();
    if (this.tokenRefreshTimestamp) {
      const timeFromlastRefresh = curTime - this.tokenRefreshTimestamp;
      if (timeFromlastRefresh < this.tokenRefreshMinPeriod) {
        return;
      }
    }
    this.httpClient.get(this.refreshUrl)
      .subscribe(
        (response) => {
          console.log('token refreshed: ');
          this.tokenRefreshTimestamp = curTime;
        },
        (err) => {
          console.warn('failed to refresh token with error: ' + err);
        });
  }
}
