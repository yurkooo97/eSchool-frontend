import { Component, OnInit } from '@angular/core';
import { Hometask } from '../../../models/hometask.model';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-hometask',
  templateUrl: './hometask.component.html',
  styleUrls: ['./hometask.component.scss']
})
export class HometaskComponent implements OnInit {

  hometasks: Hometask[];
  sortKey: string;
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;

  constructor() {
    this.hometasks = [
      {hometaskDate: '12-09-2018', hometaskDescription: 'Повторити правила', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '13-09-2018', hometaskDescription: 'Вивчити вірш', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '15-09-2018', hometaskDescription: 'Намалювати рисунок', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '16-09-2018', hometaskDescription: 'Повторити правила', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '17-09-2018', hometaskDescription: 'Вивчити вірш', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '18-09-2018', hometaskDescription: 'Намалювати рисунок', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '19-09-2018', hometaskDescription: 'Повторити правила', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '20-09-2018', hometaskDescription: 'Вивчити вірш', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '21-09-2018', hometaskDescription: 'Намалювати рисунок', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '22-09-2018', hometaskDescription: 'Повторити правила', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '23-09-2018', hometaskDescription: 'Вивчити вірш', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '24-09-2018', hometaskDescription: 'Намалювати рисунок', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '25-09-2018', hometaskDescription: 'Повторити правила', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '26-09-2018', hometaskDescription: 'Вивчити вірш', hometaskFileUrl: 'http://www.google.com'},
      {hometaskDate: '27-09-2018', hometaskDescription: 'Намалювати рисунок', hometaskFileUrl: 'http://www.google.com'},
    ];
  }

  ngOnInit() {
    this.sortOptions = [
      {label: 'Спочатку нові', value: '!year'},
      {label: 'Спочатку старі', value: 'year'},
      {label: 'По опису', value: 'description'}
    ];
  }

}
