import { Injectable } from '@angular/core';
import { Journal } from '../models/journal.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Hometask } from '../models/hometask.model';
import { JournalData } from '../models/journalData.model';
import { Student } from '../models/students.model';

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

  private urlForTeacher(teacherId?: number, isActive?: boolean): string {
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

  private urlJournalSubject(idSubject: number, idClass: number) {
    if (idSubject + idClass > 1) {
      return this.baseUrl + this.allJournals + '/subjects/' + idSubject + '/classes/' + idClass;
    } else {
      return;
    }
  }

  getJournalsTeacher(id?: number, isActive?: boolean): Observable<Journal[]> {
    const url = this.urlForTeacher(id, isActive);
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

  getjournals(idSubject: number, idClass: number): Observable<JournalData[]> {
    return this.http.get<JournalData[]>(this.urlJournalSubject(idSubject, idClass), this.httpOptions)
    .map( (response: any) => {
      return response.data;
    })
    .catch( (error: any) => {
      //MARK: remove in production
      console.log('Error data from API:' + error);
      return Observable.throwError(error);
    })
  }

  monthes(journal: JournalData[]): string[] {
    let result: string[] = [];
    
    if (journal) {
      let markDates: string[] =[];
      for (let studentIndex = 0; studentIndex < journal.length; studentIndex++) {
        for(let markIndex = 0; markIndex < journal[studentIndex].marks.length; markIndex++) {
          let markObject = journal[studentIndex].marks[markIndex];
          let month = this.month(markObject.dateMark, '.');
          if (markDates.indexOf(month) >= 0) {
            continue;
          } else {
            markDates.push(markObject.dateMark);
          }
        }
      }
      
    } else return [];
    return result;
  }

  private month(date:string, separator: string): string {
    let monthes = [''];
    let res = date.split(separator);
    if (res[1]) {
      return monthes[+res - 1];
    }
    return;
  }

  


}
