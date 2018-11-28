import { Component, OnInit } from '@angular/core';
import { isString, isNumber } from 'util';
import { Group } from '../../../models/group.model';
import { AdmingroupsService } from 'src/app/services/admingroups.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

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
  showEditDialog = false;
  editGroupOriginal: Group;
  editGroup: any;


  showDialog(rowData: Group) {
    if (!rowData) {
      rowData = new Group();
    }
    this.editGroupOriginal = rowData;
    this.editGroup = Object.assign({}, rowData);
    this.showEditDialog = true;
  }

  saveGroup() {
    // hack to convert string value set by radio button to bool
    if (isString(this.editGroup.isActive)) {
      this.editGroup.isActive = this.editGroup.isActive === '1';
    }
    this.groupService.saveClass(this.editGroup)
      .subscribe(group => {
        const isActiveChanged = this.editGroupOriginal.isActive !== this.editGroup.isActive;
        Object.assign(this.editGroupOriginal, this.editGroup);
        const newGroup = !isNumber(this.editGroup.id);
        if (newGroup) {
          this.groups.push(this.editGroup);
          this.notificationToasts.notify('success', 'Успішно виконано', 'Додано новий клас');
        }
        if (isActiveChanged || newGroup) {
          this.filterGroups();
          this.notificationToasts.notify('success', 'Успішно виконано', 'Збережено зміни класу');
        }
        this.showEditDialog = false;
      }, error => {
        this.notificationToasts.notify('error', 'Відхилено', 'Невдалося зберегти зміни');
      });
  }

  constructor(
    private groupService: AdmingroupsService,
    private notificationToasts: DataSharingService) {
    this.editGroup = new Group();
  }

  ngOnInit() {
    this.groupService.getClasses()
      .subscribe(data => {
        this.groups = data;
        this.filterGroups();
      });

    this.cols = [
      { field: 'className', header: 'Клас' },
      { field: 'classYear', header: 'Рік' }
    ];
  }

  filterGroups() {
    this.activeGroups = this.groups.filter(g => g.isActive);
    this.inactiveGroups = this.groups.filter(g => !g.isActive);
  }
}


