import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  selected: boolean;
  cols: any[];
  groups: any[];
  inactiveGroups: any[];
  
  constructor() {
    this.selected = true;
    this.inactiveGroups = [ {class: '5', year: 2018 },
                          { class: '6', year: 2018 }
    ];
    this.showSelected(this.inactiveGroups); {
      this.selected = !this.selected;
    };
    
   }

  ngOnInit() {

      this.cols = [
        
      { field: 'class', header: 'Клас' },
      { field: 'year', header: 'Рік'}
    ]                 
      this.groups = [ { class: '5', year: 2018 },
                      { class: '6', year: 2018 }, 
                      { class: '7', year: 2018 }, 
                      { class: '8-а', year: 2018 },
                      { class: '8-б', year: 2018 },
                      { class: '9-а', year: 2018 },
                      { class: '9-б', year: 2018 },
                      { class: '10-а', year: 2018 },
                      { class: '10-б', year: 2018 },
                      { class: '11-а', year: 2018 },
                      { class: '11-б', year: 2018 },

                      
    ];
    this.inactiveGroups = [ {class: '5', year: 2018 },
                          { class: '6', year: 2018 }
    ];
    
      }
       
      showSelected(inactiveGroups) {
        this.selected = !this.selected;
      }
    }
