import { Component, OnInit } from '@angular/core';

import { TeacherJournalsService } from '../../../services/teacher-journals.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Journal } from '../../../models/journal.model';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

})
export class MenuComponent implements OnInit {

  journals: Journal[];
  selectedClassName: Journal;
  selectedSubjectName: Journal;

  displayJournalsByClass: Journal[];
  displayJournalsBySubject: Journal[];

  public removeDuplicates(originalArray, prop): any {
    const newArray: any = [];
    const lookupObject: any  = {};

    for (const item in originalArray) {
      if (originalArray.hasOwnProperty(item)) {
        lookupObject[originalArray[item][prop]] = originalArray[item];
      }
    }

    for (const item in lookupObject) {
      if (lookupObject.hasOwnProperty(item)) {
        newArray.push(lookupObject[item]);
      }
    }
    this.sortByKey(newArray, 'className');
    return newArray;
  }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
      let x = a[key];
      let y = b[key];

      if (typeof x === 'string') {
        x = ('' + x).toLowerCase();
      }
      if (typeof y === 'string') {
        y = ('' + y).toLowerCase();
      }

      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  constructor(private teacherJournalService: TeacherJournalsService, private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.getJournals();
  }

  getJournals(): void {
    const idUser = this.auth.idUser;
    this.teacherJournalService.getJournalsTeacher(idUser, false)
    .subscribe(journals => {
      this.journals = journals;
      console.log(this.journals);
      console.log(this.removeDuplicates(this.journals, 'className'));
      this.displayJournalsByClass = this.removeDuplicates(this.journals, 'className');
    });
  }

  setSelectedJournal(): void {
    console.log('clicked');
    console.log(this.selectedSubjectName);
    this.teacherJournalService.emitJournalChanged(this.selectedSubjectName);
  }

  showSubjects(): void {
    if (this.selectedClassName) {
      this.selectedSubjectName = undefined;
      this.displayJournalsBySubject = this.sortByKey(this.journals.filter(elem => {
        return elem.className === this.selectedClassName.className;
      }), 'subjectName');
      console.log(this.selectedClassName.className);
    }
  }
}
