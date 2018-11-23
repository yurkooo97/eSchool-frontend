import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group.model';
import { NewStudingYearService } from 'src/app/services/new-studing-year.service';
import { ClassId } from 'src/app/models/classId.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-studing-year',
  templateUrl: './new-studing-year.component.html',
  styleUrls: ['./new-studing-year.component.scss']
})
export class NewStudingYearComponent implements OnInit {
  groupList: Group[];
  newGroupList: Group[];
  activeGroups: Group[];
  activeGroupsWithoutYear: Group[];
  newActiveGroups: Group[];
  cols: Array<object>;
  buttonSaveDisabled: boolean = true;
  buttonAddDisabled: boolean = false;
  currentYear: number;
  nextYear: number;
  oldIdArray: Array<number> = [];
  newIdArray: Array<number> = [];
  classIdArray: Array<ClassId> = [];
  newGroupsName: Array<string> = [];

  constructor(private httpService: NewStudingYearService) {}

  ngOnInit() {
    this.getGroupList();
  }
  getGroupList() {
    this.httpService.getGroups().subscribe(data => {
      this.groupList = data;
      this.filterGroups();
    });
    this.cols = [{ field: 'className', field2: 'classYear' }];
  }
  filterGroups() {
    this.activeGroups = this.groupList.filter(g => g.isActive);
    this.currentYear = this.activeGroups[0].classYear;
    this.activeGroups.forEach(item => {
      this.oldIdArray.push(item.id);
    });
  }
  addNewGroups() {
    this.buttonSaveDisabled = false;
    this.buttonAddDisabled = true;
    this.nextYear = this.currentYear + 1;
    this.httpService.postNewGroups().subscribe(data => {
      this.newGroupList = data;
      this.filterNewGroups();
    });
  }
  filterNewGroups() {
    this.activeGroupsWithoutYear = this.newGroupList.filter(gr => gr.isActive);
    this.newActiveGroups = this.activeGroupsWithoutYear.filter(
      y => y.classYear > this.nextYear - 1
    );
    this.newActiveGroups.forEach(
      item =>
        this.newIdArray.push(item.id) & this.newGroupsName.push(item.className)
    );
    this.newIdArray.forEach((item, i) =>
      this.classIdArray.push({
        oldClassId: this.oldIdArray[i],
        newClassId: item
      })
    );
  }
  saveGroup() {
    this.buttonSaveDisabled = true;
    this.httpService.putNewOldId(this.classIdArray).subscribe(data => data);
  }
}
