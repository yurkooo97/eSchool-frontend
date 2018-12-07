import { Component, OnInit } from '@angular/core';
import { TeacherJournalsService, Month } from 'src/app/services/teacher-journals.service';
import { JournalData } from 'src/app/models/journalData.model';
import { Journal } from 'src/app/models/journal.model';

@Component({
  selector: 'app-journal-data',
  templateUrl: './journal-data.component.html',
  styleUrls: ['./journal-data.component.scss']
})
export class JournalDataComponent implements OnInit {

  constructor(private teacherJournalService: TeacherJournalsService) { }
  
  journalData: JournalData[] = [];
  journalMonthes: Month[];
  isActiveJournal: boolean;
  isDataRecived: boolean = false;
  selectedMonth: Month;
  selectedJournalData: JournalData[] = [];
  days: {day: string, name: string} [];
  private _isMonthSelected: boolean;

  ngOnInit() {
    this.subscribeData();
    this._isMonthSelected = false;
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
        this.journalMonthes = this.teacherJournalService.monthes(data);
      });
    });
  }
  monthSelectedFor() {
    const monthData = this.teacherJournalService
    .monthJournal(this.selectedMonth, this.journalData);
    if (monthData.length > 1) {
      this.selectedJournalData = monthData;
      const marksDays = monthData[0].marks.map( (mark) => {
        const day = mark.dateMark.split('.').pop();
        const name = this.daysForMonth(mark.dateMark);
        const result = {day, name};
        return result;
      });
      this.days = marksDays
    }
  }
  get isSelectedMonth(): boolean {
    this._isMonthSelected = (this.selectedJournalData.length > 0);
    return this._isMonthSelected;
  }
  daysForMonth(date: string) {
    const weakDay = new Date(date).getDay();
    const days = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пя', 'Сб'];
    return days[weakDay];
  }
  changeMark(student: JournalData, mark: any) {
    //MARK: For debug, in prod - revove
    console.log(student.studentFullName);
    console.log(mark);
  }
}
