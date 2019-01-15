import { Component, OnDestroy, OnInit} from '@angular/core';
import { Hometask } from '../../../models/hometask.model';
import { SelectItem } from 'primeng/api';
import { TeacherJournalsService } from '../../../services/teacher-journals.service';
import { Journal } from '../../../models/journal.model';
import { formatDate } from '@angular/common';
import { HomeTaskFile } from '../../../models/homeTaskFile.model';
import { Mark } from '../../../models/journalMark.model';

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
  activeMark: Mark;
  activeHomeTask: Hometask;
  activeHomeTaskFile: HomeTaskFile;

  constructor(private teacherJournalService: TeacherJournalsService) { }

  ngOnInit() {
    this.teacherJournalService.journalChanged.subscribe((journal: Journal) => {
      this.activeJournal = journal;
      this.getSelectedMarks();
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

  getSelectedMarks() {
    this.teacherJournalService.markSelected.subscribe( mark => {
      this.activeMark = mark;
      this.teacherJournalService.getHomeworks(this.activeJournal.idSubject, this.activeJournal.idClass)
        .subscribe(homeTasks => {
          this.activeHomeTask = homeTasks.filter(homeTask => {
            return this.isHomeTaskSelected(homeTask);
          })[0];

          if (this.activeHomeTask.fileName) {
            this.teacherJournalService.getHomeTaskFile(this.activeMark.idLesson).subscribe(homeTaskFile => {
              this.activeHomeTaskFile = homeTaskFile;
              console.log('if', this.activeHomeTaskFile);
            });
          } else {
            this.activeHomeTaskFile = {
                idLesson: this.activeHomeTask.idLesson,
                homework: this.activeHomeTask.homework,
                fileData: '',
                fileName: 'NONE',
                fileType: ''
              };
            console.log('else', this.activeHomeTaskFile);
          }
        });
    });
  }

  isHomeTaskSelected(homeTask) {
    return (homeTask.idLesson === this.activeMark.idLesson);
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
    let fileUrl: string;
    let fileData: string;
    let fileType: string;

    if (!idLesson) {
      fileUrl = '';
    } else {
      fileData = this.homeTaskFiles[idLesson].fileData;
      fileType = this.homeTaskFiles[idLesson].fileType;
      fileUrl = this.teacherJournalService.getHomeTaskFileUrl(fileData, fileType);
    }
    window.open(fileUrl);
  }

  openSingleHomeTask(activeHomeTaskFile: HomeTaskFile): void {
    let fileUrl: string;
    let fileData: string;
    let fileType: string;

    fileData = activeHomeTaskFile.fileData;
    fileType = activeHomeTaskFile.fileType;
    fileUrl = this.teacherJournalService.getHomeTaskFileUrl(fileData, fileType);

    window.open(fileUrl);
  }

  onPastTasksChange(): void {
    this.hometasksToDisplay = this.hometasks.filter( hometask => {
      return this.isHometaskEnableToShow(hometask.date, this.showPastTasks);
    });
    this.homeTaskFiles = [];
    this.hometasksToDisplay.forEach(hometask => {
      if (hometask.fileName) {
        this.teacherJournalService.getHomeTaskFile(hometask.idLesson).subscribe(homeTaskFile => {
          this.homeTaskFiles[homeTaskFile.idLesson] = homeTaskFile;
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
