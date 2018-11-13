import { Component, OnInit } from '@angular/core';
import { isString, isNumber } from 'util';
import { Group } from '../../../models/group.model';
import { AdmingroupsService } from 'src/app/services/admingroups.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  showInactive: boolean;
  cols: Array<object>;
  groups: Group[];
  activeGroups: Group[];
  inactiveGroups: Group[];
  showEditDialog: boolean = false;
  editGroupOriginal: Group;
  editGroup : any;
  
 
  showDialog(rowData: Group) {
    if (!rowData){
      rowData = new Group();
      console.log(rowData);
    }
    this.editGroupOriginal = rowData;
    this.editGroup = Object.assign({}, rowData);
    console.log(this.editGroup);
    this.showEditDialog = true;
  }
 
  saveGroup(){
    this.showEditDialog = false;
    console.log(this.editGroup);
    this._GroupService.saveClass(this.editGroup)
      .subscribe(group => {
        console.log(group);               
  });
    
  // hack to convert string value set by radio button to bool
    if (isString(this.editGroup.isActive)){
      this.editGroup.isActive = this.editGroup.isActive == 'true';
    }

    let isActiveChanged = this.editGroupOriginal.isActive != this.editGroup.isActive;
    Object.assign(this.editGroupOriginal, this.editGroup);
      if (isActiveChanged){
        this.filterGroups();
      }
    this.showEditDialog=false;
  }
  
  constructor(private _GroupService: AdmingroupsService) {
    this.editGroup = new Group();      
  }
  ngOnInit() {
    this._GroupService.getClasses()
      .subscribe(data => {
        this.groups = data;
        this.filterGroups();
  });
    
    this.cols = [
      { field: 'className', header: 'Клас' },
      { field: 'classYear', header: 'Рік'}
    ]                 
  }

  filterGroups(){
    this.activeGroups = this.groups.filter(g => g.isActive);
    this.inactiveGroups = this.groups.filter(g => !g.isActive);
  }     
}


   