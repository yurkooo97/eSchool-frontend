import { Component, OnInit } from '@angular/core';
import { TeacherJournalsService } from 'src/app/services/teacher-journals.service';
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
  journalMonthes: string[] = [];
  isActiveJournal: boolean;
  isDataRecived: boolean = false;

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
        console.log(this.journalData);
        
      });
    })
  }

}
