import { Injectable } from '@angular/core';
import { Journal } from '../models/journal.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Hometask } from '../models/hometask.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherJournalsService {

  public journalChanged = new Subject<Journal>();

  public selectedJournal: Journal;

  readonly baseUrl: string = 'https://fierce-shore-32592.herokuapp.com';
  readonly allJournals: string = '/journals';
  readonly activeJurnal: string = '/active';

  private httpOptions = { headers: new HttpHeaders( {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE'} )};

  constructor(private http: HttpClient) { }

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
        return this.baseUrl + this.allJournals + '/teachers/' + teacherId;
      }
    } else {
      return this.baseUrl + this.allJournals; // all journals for current user/teacher
    }
  }



  getJournalsTeacher(id?: number, isActive?: boolean): Observable<Journal[]> {
    const url = this.url(id, isActive);
    const observerResponse = this.http.get<Journal[]>(url, this.httpOptions)
    .map( (response: any) => {
      return response.data;
    })
    .catch( (error: any) => {
      return throwError(error);
    });
    return observerResponse;
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
