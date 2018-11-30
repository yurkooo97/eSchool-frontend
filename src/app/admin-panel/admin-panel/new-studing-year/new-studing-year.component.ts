import { Component, OnInit } from '@angular/core';
import { NewStudingYearService } from 'src/app/services/new-studing-year.service';
import { ClassId } from 'src/app/models/classId.model';
import { Transition } from 'src/app/models/transitional-studing.model';
import { NewGroup } from 'src/app/models/transitional-groups.model';

@Component({
  selector: 'app-new-studing-year',
  templateUrl: './new-studing-year.component.html',
  styleUrls: ['./new-studing-year.component.scss']
})
export class NewStudingYearComponent implements OnInit {
  groupList: NewGroup[];
  newGroupList: NewGroup[];
  activeGroups: NewGroup[];
  activeGroupsWithoutYear: NewGroup[];
  newActiveGroups: NewGroup[];
  cols: Array<object>;
  buttonAddDisabled: boolean = false;
  hideTag: boolean = false;
  currentYear: number;
  nextYear: number;
  classIdArray: Array<ClassId> = [];
  allGroupsList: Array<Transition> = [];
  groupDigitsArrayStart: Array<string> = [];
  groupDigitsArrayMidle: Array<any> = [];
  groupDigitsArrayEnd: Array<string> = [];
  groupDigitsArray: Array<number> = [];
  counter: number;

  constructor(private httpService: NewStudingYearService) {}
  ngOnInit() {
    this.getGroupList();
  }
  getGroupList() {
    this.httpService.getGroups().subscribe(data => {
      this.groupList = data;
      this.filterGroups();
      });
    this.cols = [{ field: 'className', field2: 'classYear', field3: 'newClassName' , field4: 'newClassYear' }];
  }
  filterGroups() {
    this.activeGroups = this.groupList.filter(g => g.isActive);
    this.currentYear = this.activeGroups[0].classYear;
    this.activeGroups.forEach( item => {
      this.allGroupsList.push({
        oldClassId: item.id,
        className: item.className,
        classYear: item.classYear,
        isActive: item.isActive,
        numOfStudents: item.numOfStudents,
        newClassId: null,
        newClassName: null,
        newClassYear: null,
      });
    });
    this.allGroupsList.forEach((item, i) => {
      this.groupDigitsArrayStart.push(item.className);
      this.groupDigitsArrayMidle.push(this.groupDigitsArrayStart[i].split('-'));
      this.groupDigitsArrayEnd.push(this.groupDigitsArrayMidle[i][0]);
      this.groupDigitsArray.push(parseInt(this.groupDigitsArrayEnd[i]));
    });
  }
  addNewGroups() {
    this.nextYear = this.currentYear + 1;
    this.httpService.postNewGroups().subscribe(data => {
      this.newGroupList = data;
      this.filterNewGroups();
      this.httpService.putNewOldId(this.classIdArray).subscribe( () => {
        this.hideTag = true;
        this.buttonAddDisabled = true;
      });
    });
  }
  filterNewGroups() {
    this.activeGroupsWithoutYear = this.newGroupList.filter(gr => gr.isActive);
    this.newActiveGroups = this.activeGroupsWithoutYear.filter(
      y => y.classYear > this.nextYear - 1
    );
    this.newActiveGroups.forEach(
      (item, i) => {
        this.allGroupsList[i].newClassName = item.className;
        this.allGroupsList[i].newClassYear = this.nextYear;
      }
    );
    let counter = 0;
    this.allGroupsList.forEach((item, i) => {
      if (this.groupDigitsArray[i] > 10) {
        item.newClassName = 'Випущений' ;
        item.newClassId = 0;
        item.newClassYear = item.classYear;
      } else {
          item.newClassName = this.newActiveGroups[counter].className;
          item.newClassId = this.newActiveGroups[counter].id;
          item.newClassYear = this.newActiveGroups[counter].classYear;
          counter++;
      }
    });
    this.allGroupsList.forEach((item, i) =>
      this.classIdArray.push({
        oldClassId: item.oldClassId,
        newClassId: item.newClassId
      })
    );
  }
}
