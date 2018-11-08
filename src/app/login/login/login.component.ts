import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
		this.userName = null;
		this.password = null;
	 }

	userName: string;
	password: string;
	errorMessage: string;

  ngOnInit() {}
	Login() {
		
		this.authService.login(this.userName, this.password)
			.subscribe((result) => {
					this.errorMessage = null;
					console.log(result);
					//TODO: redirect user to home page
				},
				error =>{
					this.errorMessage = 'TODO: write error message';
				
					console.log(error.message);
					
				});
	}	
}
	
		



