import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {

  items: MenuItem[];
  private subscription: Subscription;

  constructor(
    private _authService: AuthenticationService,
    private messageService: MessageService,
    private notificationToasts: DataSharingService) { }

  ngOnInit() {
    this.subscribeToNotifications();

    this.items = [
      {
        label: 'Струтинська Тетяна Олександрівна (Вчитель)',
        items: [

          { label: 'Menu' },
          {
            label: 'Logout', command: (click) => {
              this.LogOut();
            }, routerLink: ['/login']
          }
        ]
      }
    ];
  }

  LogOut() {
    this._authService.logOut();
  }

  subscribeToNotifications() {
    this.subscription = this.notificationToasts.showToasts
      .subscribe(notification => this.messageService.add(notification));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
