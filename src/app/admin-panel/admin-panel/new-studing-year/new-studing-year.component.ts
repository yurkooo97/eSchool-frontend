import { Component, OnInit } from '@angular/core';
import { NewStudingYearService } from 'src/app/services/new-studing-year.service';
import { ClassId } from 'src/app/models/classId.model';
import { Transition } from 'src/app/models/transitional-studing.model';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-new-studing-year',
  templateUrl: './new-studing-year.component.html',
  styleUrls: ['./new-studing-year.component.scss']
})
export class NewStudingYearComponent implements OnInit {
  groupList: Group[];
  newGroupList: Group[];
  activeGroups: Group[];
  newActiveGroups: Group[];
  cols: Array<object>;
  buttonAddDisabled = false;
  hideTag = false;
  classIdArray: Array<ClassId> = [];
  classIdArrayBefore: Array<ClassId> = [];
  allGroupsList: Array<Transition> = [];
  groupDigitsArray: Array<number> = [];
  counter: number;
  val = true;

  constructor(private httpService: NewStudingYearService) {}
  ngOnInit() {
    this.getGroupList();
  }
  getGroupList() {
    this.httpService.getGroups().subscribe(data => {
      this.groupList = data;
      this.filterGroups();
      });
    this.cols = [{ classNameField: 'className', classYearField: 'classYear', newClassNameField: 'newClassName',
      newClassYearField: 'newClassYear', checkboxField: 'checkbox', colorStyleField: 'colorStyle' }];
  }
  filterGroups() {
    this.activeGroups = this.groupList.filter(g => g.isActive);
    this.activeGroups.forEach( item => {
      this.allGroupsList.push({
        oldClassId: item.id, className: item.className, classYear: item.classYear,
        isActive: item.isActive, numOfStudents: item.numOfStudents, newClassId: null,
        newClassName: null, newClassYear: null, checkbox: true, colorStyle: null,
      });
    });
    this.allGroupsList.forEach( item => {
      this.groupDigitsArray.push(parseInt(item.className, 10));
    });
  }
  addNewGroups() {
    this.filterFalseCheckedGroups();
    this.httpService.putNewOldId(this.classIdArrayBefore).subscribe( () => {
      this.httpService.postNewGroups().subscribe(data => {
        this.newGroupList = data;
        this.filterNewGroups();
        this.passOldAndNewId();
        this.httpService.putNewOldId(this.classIdArray).subscribe( () => {
          this.hideTag = true;
          this.buttonAddDisabled = true;
        });
      });
    });
  }
  filterFalseCheckedGroups() {
    this.allGroupsList.forEach( item => {
      if (item.checkbox !== true) {
        item.newClassName = 'Не діючий';
        item.newClassYear = item.classYear + 1;
        item.colorStyle = '#a9a39e';
        this.classIdArrayBefore.push({
          oldClassId: item.oldClassId,
          newClassId: 0
        });
      }
    });
  }
  filterNewGroups() {
    this.newActiveGroups = this.newGroupList.filter(gr => gr.isActive);
    let counter = 0;
    this.allGroupsList.forEach((item, i) => {
      if (item.checkbox === true) {
        if (this.groupDigitsArray[i] > 10) {
          item.newClassName = 'Випущений' ;
          item.newClassId = 0;
          item.newClassYear = item.classYear;
          item.colorStyle = '#ff9c33';
        } else {
            item.newClassName = this.newActiveGroups[counter].className;
            item.newClassId = this.newActiveGroups[counter].id;
            item.newClassYear = this.newActiveGroups[counter].classYear;
            counter++;
        }
      }
    });
  }
  passOldAndNewId() {
    this.allGroupsList.forEach( item => {
      if (item.checkbox === true) {
        this.classIdArray.push({
          oldClassId: item.oldClassId,
          newClassId: item.newClassId
        });
      }
    });
  }
  checkboxEvent(val) {
    this.allGroupsList.forEach( item =>
      item.checkbox = val
    );
  }
}
