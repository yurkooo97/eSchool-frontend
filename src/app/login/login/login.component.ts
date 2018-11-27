import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) {
    this.userName = null;
    this.password = null;
  }

  userName: string;
  password: string;
  errorMessage: string;

  ngOnInit() { }
  Login() {
    this.authService.login(this.userName, this.password)
      .subscribe((result) => {
        this.errorMessage = null;
        let route: string;
        const role = this.authService.getRole();
        switch (role) {
          case 'ROLE_ADMIN':
            route = '/shell/admin-panel/';
            break;
          case 'ROLE_TEACHER':
            route = '/shell/journal';
            break;
          case 'ROLE_USER':
            route = '/shell/';
            break;
        }
        this.router.navigate([route]);
      },
        error => {
          if (error.error.status.message) {
            this.errorMessage = 'Ви ввели невірні дані';
          }
        });
  }
}




