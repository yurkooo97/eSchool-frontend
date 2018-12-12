import { Component, OnInit } from '@angular/core';
import { NewStudingYearService } from 'src/app/services/new-studing-year.service';
import { ClassId } from 'src/app/models/classId.model';
import {
  Transition,
  SmallGroup
} from 'src/app/models/transitional-studing.model';
import { Group } from 'src/app/models/group.model';
import { DataSharingService } from 'src/app/services/data-sharing.service';

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
  numOfStudentsArray: Array<number> = [];
  counter: number;
  val = true;
  groupsExistArray: Array<SmallGroup> = [];
  isCurrentStudingYear: Array<boolean> = [];

  constructor(
    private httpService: NewStudingYearService,
    private notificationToasts: DataSharingService
  ) {}

  ngOnInit() {
    this.getGroupList();
  }

  getGroupList() {
    this.httpService.getGroups().subscribe(data => {
      this.groupList = data;
      this.filterGroups();
      this.checkStudingYear();
      this.checkNumOfStudents();
      this.checkGroupsExisting();
    });
    this.cols = [
      {
        classNameField: 'className',
        classYearField: 'classYear',
        newClassNameField: 'newClassName',
        newClassYearField: 'newClassYear',
        checkboxField: 'checkbox',
        colorStyleField: 'colorStyle'
      }
    ];
  }

  filterGroups() {
    this.activeGroups = this.groupList.filter(g => g.isActive);
    this.activeGroups.forEach(item => {
      this.allGroupsList.push({
        oldClassId: item.id,
        className: item.className,
        classYear: item.classYear,
        isActive: item.isActive,
        numOfStudents: item.numOfStudents,
        newClassId: null,
        newClassName: null,
        newClassYear: null,
        checkbox: true,
        colorStyle: null
      });
    });
    this.allGroupsList.forEach(item => {
      this.groupDigitsArray.push(parseInt(item.className, 10));
    });
  }

  addNewGroups() {
    this.filterFalseCheckedGroups();
    this.httpService.putNewOldId(this.classIdArrayBefore).subscribe(() => {
      this.httpService.postNewGroups().subscribe(data => {
        this.newGroupList = data;
        this.filterNewGroups();
        this.passOldAndNewId();
        this.httpService.putNewOldId(this.classIdArray).subscribe(() => {
          this.hideTag = true;
          this.buttonAddDisabled = true;
          this.notificationToasts.notify(
            'success',
            'Успішно виконано',
            'Перехід на новий навчальний рік'
          );
        });
      });
    });
  }

  filterFalseCheckedGroups() {
    this.allGroupsList.forEach(item => {
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
          item.newClassName = 'Випущений';
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
    this.allGroupsList.forEach(item => {
      if (item.checkbox === true) {
        this.classIdArray.push({
          oldClassId: item.oldClassId,
          newClassId: item.newClassId
        });
      }
    });
  }

  checkboxEvent(val) {
    this.allGroupsList.forEach(item => (item.checkbox = val));
  }

  checkNumOfStudents() {
    this.allGroupsList.forEach(item =>
      this.numOfStudentsArray.push(item.numOfStudents)
    );
    if (this.numOfStudentsArray.includes(0)) {
      this.buttonAddDisabled = true;
      this.notificationToasts.notify(
        'error',
        'Відхилено',
        'В даному переліку класів є такі, ' +
          'в яких немає жодного учня. Будь ласка, додайте хоча б одного учня до класу або видаліть ' +
          'такий клас з переліку активних',
        true
      );
    }
  }

  checkGroupsExisting() {
    this.allGroupsList.forEach((item, i) => {
      if (this.groupDigitsArray[i] < 11) {
        this.groupsExistArray.push({
          className: [
            parseInt(item.className, 10) + 1,
            item.className.split('-')[1]
          ].join('-'),
          classYear: item.classYear + 1
        });
      }
    });
    this.groupList.forEach(item => {
      this.groupsExistArray.forEach(item2 => {
        if (
          item.className === item2.className &&
          item.classYear === item2.classYear
        ) {
          this.buttonAddDisabled = true;
          this.notificationToasts.notify(
            'error',
            'Відхилено',
            'В даному переліку класів є такі, ' +
              'які перейшли на новий навчальний рік раніше.',
            true
          );
        }
      });
    });
  }

  checkStudingYear() {
    this.allGroupsList.forEach(item =>
      this.isCurrentStudingYear.push(
        item.classYear === this.allGroupsList[0].classYear
      )
    );
    if (this.isCurrentStudingYear.includes(false)) {
      this.notificationToasts.notify(
        'warn',
        'Попередження',
        'В даному переліку класів є такі, ' +
          'які відносяться до різних навчальних років',
        true
      );
    }
  }
}
