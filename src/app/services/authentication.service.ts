import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public Url: string = 'https://fierce-shore-32592.herokuapp.com/signin';
  private refreshUrl: string = "https://fierce-shore-32592.herokuapp.com/refresh";
  private tokenRefreshMinPeriod: number;
  private tokenRefreshTimestamp: number;

  constructor(private httpClient: HttpClient) {
    this.tokenRefreshMinPeriod = 1000 * 60 * 5;
  }

  login(userName: string, password: string) {
    let userData = { username: userName, password: password };
    return this.httpClient.post(this.Url, userData, { observe: 'response' })
      .map((response: any) => {
      if (response.status.code === 200 || response.status.code === 204) {
          this.tokenRefreshTimestamp = new Date().getTime();
          localStorage.setItem('authToken', response.headers.get('Authorization'));
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
          console.debug("token refreshed: " + JSON.stringify(response));
          this.tokenRefreshTimestamp = curTime;
        },
        (err) => {
          console.warn("failed to refresh token with error: " + err);
        });

  }

}
