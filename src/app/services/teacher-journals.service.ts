import { Injectable } from '@angular/core';
import { Journal } from '../models/journal.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';

const teacherId = 1; // for debug mode, remove in prod

@Injectable({
  providedIn: 'root'
})
export class TeacherJournalsService {

  public journalChanged = new Subject<Journal>();

  constructor(private http: HttpClient) { }

  public selectedJournal: Journal;

  readonly allJournalsUrl: string = 'https://fierce-shore-32592.herokuapp.com/journals';
  readonly activeJurnal: string = '/active';

  public emitJournalChanged(journal: Journal) {
    this.journalChanged.next(journal);
  }

  private url(teacherId?: number, isActive?: boolean): string {

    if (teacherId >= 1) {
      if (isActive) {
        return this.allJournalsUrl + '/teachers/' + teacherId + this.activeJurnal;
      } else {
        return this.allJournalsUrl + '/teachers/' + teacherId;
      }
    } else {
      return this.allJournalsUrl //all jurnals for current user/teacher
    }
  }

  private httpOptions = { headers: new HttpHeaders( {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE'}
      // 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtR3J1c2gwMyIsIlJvbGVzIjp7ImF1dGhvcml0eSI6IlJPTEVfVEVBQ0hFUiJ9LCJleHAiOjE1NDIzNjU4ODksImlhdCI6MTU0MjM2MjI4OSwianRpIjoiMSJ9.x3QpMzGpJymwxVpx17me90aqbXb8Akq_yZeY6p4qScU7UZrNDMxugKnIyd8gsE9wYX7QuDryRvqTEuxd9NCGEQ'

      )
    };

  getJournalsTeacher(id?: number, isActive?: boolean): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.url(1, isActive), this.httpOptions)
    .map( (response: any) => {
      return response.data;
    })
    .catch( (error: any) => {
      return throwError(error);
    });
  }

  setSelectedJournal(journal: Journal): void {
    console.log('setted');
    this.selectedJournal = journal;
  }
  getSelectedJournal(): Journal {
    return this.selectedJournal;
  }
}
