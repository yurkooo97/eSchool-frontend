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

  private _displayJournals: Journal[];

  get displayJpournals (): Journal[] {
    // const journals = this.journals[];
    // const displayJpournals: Journal[] = this.journals.map( journal => {
    //   for (let item of this.journals) {
    //     if (journal.className === item.className) {
    //       continue;
    //     } else {
    //       return item;
    //     }
    //   }
    // });
    // return displayJournals;
    this._displayJournals = new Array<Journal>();
    if (this.journals ) {
      for (let journalItem of this.journals) {
        // if (!this._displayJournals.length) {
        //   continue;
        // }
        for (let item of this._displayJournals) {
          if (item.className === journalItem.className) {
            continue;
          } else {
            this._displayJournals.push(item);
          }
        }
      }
      return this._displayJournals;
      // this.journals.map( journal => {
      //   for (let item of this.journals) {
      //     if (journal.className === item.className) {
      //       continue;
      //     } else {
      //       return item;
      //     }
      //   }
      // });
    } else {
      return new Array<Journal>();
    }
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
    let idUser = this.auth.idUser;
    this.teacherJournalService.getJournalsTeacher(idUser, true)
    .subscribe(journals => {
      this.journals = journals;
      console.log(this.displayJpournals);
    });
  }
  setSelectedJournal(): void {
    console.log('clicked');
    this.teacherJournalService.setSelectedJournal(this.selectedClassName);
    console.log(this.selectedClassName);
    this.teacherJournalService.emitJournalChanged(this.selectedClassName);
  }
}
