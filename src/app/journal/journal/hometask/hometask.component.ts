import { Component, OnDestroy, OnInit} from '@angular/core';
import { Hometask } from '../../../models/hometask.model';
import { SelectItem } from 'primeng/api';
import { TeacherJournalsService } from '../../../services/teacher-journals.service';
import { Journal } from '../../../models/journal.model';

@Component({
  selector: 'app-hometask',
  templateUrl: './hometask.component.html',
  styleUrls: ['./hometask.component.scss']
})
export class HometaskComponent implements OnInit, OnDestroy {

  hometasks: Hometask[];
  sortKey: string;
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;
  showPastTasks = false;

  activeJournal: Journal;
  selectedLessons: Hometask[];

  constructor(private teacherJournalService: TeacherJournalsService) { }

  ngOnInit() {
    this.teacherJournalService.journalChanged.subscribe((journal: Journal) => {
      this.activeJournal = journal;
      this.teacherJournalService.getHomeworks(this.activeJournal.idSubject, this.activeJournal.idClass)
        .subscribe(hometasks =>
        this.hometasks = hometasks);
    });

    this.sortOptions = [
      {label: 'Спочатку нові', value: '!date'},
      {label: 'Спочатку старі', value: 'date'},
      {label: 'По опису', value: 'homework'}
    ];
  }

  ngOnDestroy() {
   this.teacherJournalService.journalChanged.unsubscribe();
  }

  onSortChange(event): void {
    const value = event.value;
    console.log('value', value);
    console.log(this.hometasks);
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  openHomeTask(fileSrc: string): void {

    // after filling DB by urls google placeholder should be removed
    if (!fileSrc) {
      fileSrc = 'http://www.google.com';
    }
    window.open(fileSrc);
    console.log(fileSrc);
  }

  onPastTasksChange(): void {
    console.log('show past tasks', this.showPastTasks);
  }
}
