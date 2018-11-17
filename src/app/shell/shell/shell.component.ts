import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
	selector: 'app-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

	items: MenuItem[];

	constructor(private _authService: AuthenticationService) { }

	ngOnInit() {
		this.items = [
			{
				label: 'Струтинська Тетяна Олександрівна (Вчитель)',
				items: [

					{ label: 'Menu' },
					{
						label: 'Logout', command: (click) => {
							this.LogOut()
						}, routerLink: ['/login']
					}
				]
			}
		];
	}
	LogOut() {
		this._authService.logOut();
	}
}
