import { Component, OnDestroy, OnInit} from '@angular/core';
import { Hometask } from '../../../models/hometask.model';
import { SelectItem } from 'primeng/api';
import { TeacherJournalsService } from '../../../services/teacher-journals.service';
import { Journal } from '../../../models/journal.model';
import { formatDate } from '@angular/common';
import { HomeTaskFile } from '../../../models/homeTaskFile.model';

@Component({
  selector: 'app-hometask',
  templateUrl: './hometask.component.html',
  styleUrls: ['./hometask.component.scss']
})
export class HometaskComponent implements OnInit {

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
  homeTaskFiles: HomeTaskFile[];

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

  openHomeTask(idLesson: number): void {

    let file: string;

    if (!idLesson) {
      file = '';
    } else {
      file = this.homeTaskFiles[idLesson].fileData;
      console.log('file', file);
    }
    window.open('/');
  }

  onPastTasksChange(): void {
    this.hometasksToDisplay = this.hometasks.filter( hometask => {
      return this.isHometaskEnableToShow(hometask.date, this.showPastTasks);
    });
    this.homeTaskFiles = [];
    this.hometasksToDisplay.forEach( hometask => {
      if (hometask.fileName) {
        this.teacherJournalService.getHomeTaskFile(hometask.idLesson).subscribe(homeTaskFile => {
          this.homeTaskFiles[homeTaskFile.idLesson] = homeTaskFile;
          console.log(this.homeTaskFiles);
        });
      }
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
