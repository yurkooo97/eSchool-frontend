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
<<<<<<< HEAD
      label:'Навігація',
      items:[
				{ label: 'Учні', icon: 'pi  pi-users', routerLink: ['students']},
        {label: 'Учителі', icon: 'pi pi-user-minus', routerLink: ['teachers']},
        {label: 'Предмети', icon: 'pi pi-pencil', routerLink: ['subjects']},
				{label: 'Класи', icon: 'pi pi-folder', routerLink: ['groups']},
				{ label: 'Розклад уроків', icon: 'pi pi-info', routerLink: ['class-schedule']},
        {label: 'Створити новий навчальний рік', icon:'pi pi-fw pi-plus', routerLink: ['new-studing-year']}
    ]
  }]
=======
      label: 'Навігація',
      items: [
        { label: 'Учні', icon: 'pi  pi-users', routerLink: ['students'] },
        { label: 'Учителі', icon: 'pi pi-user-minus', routerLink: ['teachers'] },
        { label: 'Предмети', icon: 'pi pi-pencil', routerLink: ['subjects'] },
        { label: 'Класи', icon: 'pi pi-folder', routerLink: ['groups'] },
        { label: 'Створити новий навчальний рік', icon: 'pi pi-fw pi-plus', routerLink: ['new-studing-year'] },
        { label: 'Додати вчителя до журналу', icon: 'pi pi-user-plus', routerLink: ['attach-teacher'] }
      ]
    }];
>>>>>>> 53eb145c64c009adcba7c0a3d39eec51c6e0330d
  }
}
