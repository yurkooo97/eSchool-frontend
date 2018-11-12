import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	public Url:string="https://fierce-shore-32592.herokuapp.com/signin";
	private token: string;

	constructor(private httpClient:HttpClient) {
		this.token = localStorage.getItem('authToken');
	}
	
	login (userName: string, password: string) {
		let userData = {username: userName, password: password};
		return this.httpClient.post(this.Url, userData)
			.map((response: any) => {
				if (response.status.code == 200){
					this.token = response.data.token;
					localStorage.setItem('authToken', this.token);
				}
				return response;
			});
	}
	public isAuthenticated(): boolean {
		return this.token !== null;
	}
	getToken() {
		return this.token;
	}
	logOut() {
		this.token = null;
		localStorage.removeItem('authToken');
	}
	loggedIn() {
		return !!localStorage.getItem('authToken')
	}
}
