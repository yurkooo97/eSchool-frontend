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
        if (this.authService.getRole()) {
          this.router.navigate([this.authService.defaultRoute()]);
        }
      },
        error => {
          if (error.error.status.message) {
            this.errorMessage = 'Ви ввели невірні дані';
          }
        });
  }
}
