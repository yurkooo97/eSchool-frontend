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

  // classNames: SelectItem[];
  // selectedClassName: string;
  // subjectNames: SelectItem[];
  // selectedSubjectName: string;

  // classes: Journal[];
  journals: Journal[];
  selectedClassName: Journal;
  selectedSubjectName: Journal;

  displayJournalsByClass: Journal[];
  displayJournalsBySubject: Journal[];

    // = new Array<Journal>();

  // public displayJournals (): Journal[] {
     // const journals = this.journals[];
  //   // const displayJpournals: Journal[] = this.journals.map( journal => {
  //   //   for (let item of this.journals) {
  //   //     if (journal.className === item.className) {
  //   //       continue;
  //   //     } else {
  //   //       return item;
  //   //     }
  //   //   }
  //   // });
  //   // return displayJournals;
  //   this._displayJournals = new Array<Journal>();
  //   //console.log (this._displayJournals);
	//
  //   if (this.journals) {
  //     //console.log (this.journals);
	//
  //     // for (let journalItem of this.journals) {
  //     //   //console.log (journalItem);
  //     //   console.log (this._displayJournals);
		// 	//
  //     //   // if (!this._displayJournals.length) {
  //     //   //   continue;
  //     //   // }
  //     //   //console.log('this._displayJournals.lenght', this._displayJournals.length);
		// 	//
  //     //   if (this._displayJournals.length) {
  //     //     for (let item of this._displayJournals) {
  //     //       if (item.className === journalItem.className) {
  //     //         //console.log('item.className', item.className);
  //     //         //console.log('journalItem.className', journalItem.className);
  //     //         continue;
  //     //       } else {
  //     //         this._displayJournals.push(item);
  //     //       }
  //     //     }
  //     //   } else {
  //     //     this._displayJournals.push(journalItem);
  //     //     //console.log (journalItem);
		// 	//
  //     //   }
  //     // }
  //     // return this._displayJournals;
  //     // // this.journals.map( journal => {
  //     // //   for (let item of this.journals) {
  //     // //     if (journal.className === item.className) {
  //     // //       continue;
  //     // //     } else {
  //     // //       return item;
  //     // //     }
  //     // //   }
  //     // // });
  //   } else {
  //     return new Array<Journal>();
  //   }
  //  return new Array<Journal>();

   // }

  public removeDuplicates(originalArray, prop): any {
    const newArray: any = [];
    const lookupObject: any  = {};

    for (const i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (const i in lookupObject) {
      newArray.push(lookupObject[i]);
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
    // this.classNames = [
    //  {label: 'Оберіть клас', value: null},
    //  {label: '7-А', value: '7-А'},
    //  {label: '8-Б', value: '8-Б'},
    //  {label: '9-Е', value: '9-Е'},
    // ];
    // this.subjectNames = [
    //   {label: 'Оберіть предмет', value: null},
    //   {label: 'Історія', value: 'Історія'},
    //   {label: 'Математика', value: 'Математика'},
    //   {label: 'Фізика', value: 'Фізика'},
    // ];
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
      // this.displayJournals();
    });
  }
  setSelectedJournal(): void {
    console.log('clicked');
    this.teacherJournalService.setSelectedJournal(this.selectedSubjectName);
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
