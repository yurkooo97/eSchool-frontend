import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
          label: 'Username',
          items: [
              {label: 'Menu'},
              {label: 'Logout'}
          ]
      }
  
  ];
  }

}
