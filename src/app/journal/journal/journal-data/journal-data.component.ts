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
        console.debug('data:',data);
        this.journalData = data;
        this.isDataRecived = true;
        this.journalMonthes = this.teacherJournalService.monthes(data);
        // console.debug('months:', this.journalMonthes);
        
      });
    });
  }

  monthSelectedFor() {
    this.teacherJournalService.monthJournal(this.selectedMonth, this.journalData);
  }
 
  daysOfMonth(date: string): string[] {
    return[]
  }

}
