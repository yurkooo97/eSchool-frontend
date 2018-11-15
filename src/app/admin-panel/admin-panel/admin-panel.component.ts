import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-admin-panel',
	templateUrl: './admin-panel.component.html',
	styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
	constructor() { }

	items: MenuItem[];

	ngOnInit() {
		this.items = [{
			label: 'Навігація',
			items: [
				{ label: 'Учні', icon: 'pi  pi-users', routerLink: ['students'] },
				{ label: 'Учителі', icon: 'pi pi-user-minus', routerLink: ['teachers'] },
				{ label: 'Предмети', icon: 'pi pi-pencil', routerLink: ['subjects'] },
				{ label: 'Класи', icon: 'pi pi-folder', routerLink: ['groups'] },
				{ label: 'Створити новий навчальний рік', icon: 'pi pi-fw pi-plus', routerLink: ['new-studing-year'] }
			]
		}]
	}
}


