import { Component, OnDestroy, OnInit} from '@angular/core';
import { Hometask } from '../../../models/hometask.model';
import { SelectItem } from 'primeng/api';
import { TeacherJournalsService } from '../../../services/teacher-journals.service';
import { Journal } from '../../../models/journal.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-hometask',
  templateUrl: './hometask.component.html',
  styleUrls: ['./hometask.component.scss']
})
export class HometaskComponent implements OnInit, OnDestroy {

  hometasks: Hometask[];
  hometasksToDisplay: Hometask[];
  sortKey: string;
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;
  showPastTasks = false;
  activeJournal: Journal;
  selectedLessons: Hometask[];
  currentDate: string;
  today = new Date();

  constructor(private teacherJournalService: TeacherJournalsService) { }

  ngOnInit() {
    this.teacherJournalService.journalChanged.subscribe((journal: Journal) => {
      this.activeJournal = journal;
      this.teacherJournalService.getHomeworks(this.activeJournal.idSubject, this.activeJournal.idClass)
        .subscribe(hometasks => {
            this.hometasks = hometasks;
            this.hometasksToDisplay = this.hometasks.filter( hometask => {
              return this.isHometaskEnableToShow(hometask.date, this.showPastTasks);
            });
        });
    });

    this.sortOptions = [
      {label: 'Спочатку нові', value: '!date'},
      {label: 'Спочатку старі', value: 'date'},
      {label: 'По опису', value: 'homework'}
    ];

    this.currentDate = formatDate(this.today, 'yyyy.MM.dd', 'en-US', '+0200');
  }

  ngOnDestroy() {
   this.teacherJournalService.journalChanged.unsubscribe();
  }

  onSortChange(event): void {
    const value = event.value;
    console.log('value', value);
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  openHomeTask(fileSrc: string): void {
    // after filling DB by hometask's urls google placeholder should be removed
    if (!fileSrc) {
      fileSrc = 'http://www.google.com';
    }
    window.open(fileSrc);
  }

  onPastTasksChange(): void {
    this.hometasksToDisplay = this.hometasks.filter( hometask => {
      return this.isHometaskEnableToShow(hometask.date, this.showPastTasks);
    });
  }

  isHometaskEnableToShow(hometaskDate: string, showPast = false): boolean {
    let rule = showPast;
    if (hometaskDate > this.currentDate) {
      rule = true;
    }
    return rule;
  }
}
