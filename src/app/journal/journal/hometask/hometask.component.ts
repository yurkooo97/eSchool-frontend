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

  public hometasks: Hometask[];
  sortKey: string;
  sortOptions: SelectItem[];
  sortField: string;
  sortOrder: number;

  public activeJournal: Journal;

  constructor(private teacherJournalService: TeacherJournalsService) { }

  ngOnInit() {
    // HERE IS WORKING SUBSCRIBER
    this.teacherJournalService.journalChanged.subscribe((journal: Journal) => {
      this.activeJournal = journal;
      this.teacherJournalService.getHomeworks(this.activeJournal.idSubject, this.activeJournal.idClass)
        .subscribe(hometasks =>
        this.hometasks = hometasks);
    });
    // this.teacherJournalService.getHomeworks(21, 11).subscribe(hometasks =>
    //   this.hometasks = hometasks);

    this.sortOptions = [
      {label: 'Спочатку нові', value: '!year'},
      {label: 'Спочатку старі', value: 'year'},
      {label: 'По опису', value: 'description'}
    ];
  }
  ngOnDestroy() {
    this.teacherJournalService.journalChanged.unsubscribe();
  }
}
