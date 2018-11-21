import { Injectable } from '@angular/core';
import { Journal } from '../models/journal.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Hometask } from '../models/hometask.model';

const teacherId = 1; // for debug mode, remove in prod

@Injectable({
  providedIn: 'root'
})
export class TeacherJournalsService {

  public journalChanged = new Subject<Journal>();

  constructor(private http: HttpClient) { }

  public selectedJournal: Journal;

  readonly baseUrl: string = 'https://fierce-shore-32592.herokuapp.com';
  readonly allJournals: string = '/journals';
  readonly activeJurnal: string = '/active';

  public emitJournalChanged(journal: Journal) {
    this.journalChanged.next(journal);
  }

  private homeTaskUrl(idSubject: number, idClass: number): string {
    return this.baseUrl + '/homeworks/subjects/' + idSubject + '/classes/' + idClass;
  }

  private url(teacherId?: number, isActive?: boolean): string {
    if (teacherId > 0) {
      if (isActive) {
        return this.baseUrl + this.allJournals + '/teachers/' + teacherId + this.activeJurnal;
      } else {
        return this.baseUrl + '/teachers/' + teacherId;
      }
    } else {
      return this.baseUrl+this.allJournals //all jurnals for current user/teacher
    }
  }

  private httpOptions = { headers: new HttpHeaders( {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE'} )};

  getJournalsTeacher(id?: number, isActive?: boolean): Observable<Journal[]> {
    let url = this.url(id, isActive);
    let observerResponse = this.http.get<Journal[]>(url, this.httpOptions)
    .map( (response: any) => {
      return response.data;
    })
    .catch( (error: any) => {
      return throwError(error);
    });
    return observerResponse;
  }

  setSelectedJournal(journal: Journal): void {
    console.log('setted');
    this.selectedJournal = journal;
  }
  getSelectedJournal(): Journal {
    return this.selectedJournal;
  }

  getHomeworks(idSubject: number, idClass: number): Observable<Hometask[]> {
    return this.http.get<Hometask[]>(this.homeTaskUrl(idSubject, idClass), this.httpOptions)
      .map( (response: any) => {
        return response.data;
      }).catch( (error: any) => {
        return throwError(error);
      });
  }
}
