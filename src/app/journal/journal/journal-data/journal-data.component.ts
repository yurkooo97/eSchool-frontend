import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeacherJournalsService } from 'src/app/services/teacher-journals.service';
import { JournalData } from 'src/app/models/journalData.model';
import { Journal } from 'src/app/models/journal.model';
import { Month } from 'src/app/models/month.model';

@Component({
  selector: 'app-journal-data',
  templateUrl: './journal-data.component.html',
  styleUrls: ['./journal-data.component.scss']
})
export class JournalDataComponent implements OnInit, OnDestroy {

  constructor(private teacherJournalService: TeacherJournalsService) { }

  journalData: JournalData[];
  isActiveJournal: boolean;
  isDataRecived = false;
  scrollableCols: { field: string, header: string } [];
  frozenCols: { field: string, header: string } [] = [{field: 'studentFullName', header: 'Студент'}, {field: 'count', header: 'Рейтинг'}];

  ngOnInit() {
    this.subscribeData();
  }

  subscribeData() {
    this.teacherJournalService
    .journalChanged
    .subscribe((journal: Journal) => {
      this.teacherJournalService
      .getjournals(journal.idSubject, journal.idClass)
      .subscribe( data => {
        this.journalData = data;
        this.isDataRecived = true;
        this.scrollableCols = this.journalDeys;
      });
    });
  }

  get journalDeys(): { field: string, header: string } [] {
    if (this.journalData) {
      return this.journalData[0].marks.map( (mark, index) => {
        const weekDay = this.daysForMonth(mark.dateMark) + ' ';
        const day = mark.dateMark.slice(mark.dateMark.indexOf('.') + 1);
        return {field: '' + index, header: weekDay + day};
      });
    } else {
      console.log('Journal data is empty!');
      return;
    }
  }
  daysForMonth(date: string) {
    const weakDay = new Date(date).getDay();
    const days = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пя', 'Сб'];
    return days[weakDay];
  }
  changeMark(student: JournalData, mark: any) {
    // MARK: For debug, in prod - revove
    console.log(student.studentFullName);
    console.log(mark);
  }
  ngOnDestroy(): void {
    this.teacherJournalService.journalChanged.unsubscribe();
  }

  markStudent(student: JournalData, markIndex: number): string {
    if (!isNaN(markIndex)) {
      const mark = student.marks[markIndex].mark;
      if (mark) {
        return mark;
      } else {
        return '';
      }
    } else {
      return student[markIndex];
    }
  }
}
