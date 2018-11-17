import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public Url: string = 'https://fierce-shore-32592.herokuapp.com/signin';

  constructor(private httpClient: HttpClient) {
  }

  login(userName: string, password: string) {
    let userData = { username: userName, password: password };
    return this.httpClient.post(this.Url, userData, { observe: 'response' })
      .map((response: any) => {
        if (response.status === 200 || response.status === 204) {
          localStorage.setItem('authToken', response.headers.get('Authorization'));
        }
        return response;
      });
   }

  getToken() {
    return localStorage.getItem('authToken');
  }

  logOut() {
    localStorage.removeItem('authToken');
  }

  loggedIn() {
    return !!localStorage.getItem('authToken');
  }

}
