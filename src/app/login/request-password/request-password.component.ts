import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})

export class RequestPasswordComponent implements OnInit {

  constructor(private authService: AuthenticationService) {
    this.userName = '';
  }
  userName: string;
  succsess: boolean;

  ngOnInit() { }

  Submit() {
    this.authService.requestPasswordReset(this.userName)
      .subscribe((response) => {
        if (response.status.code === 200) {
          this.succsess = true;
        }
      });
  }
}

