import { Injectable } from '@angular/core';
import { Journal } from '../models/journal.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Hometask } from '../models/hometask.model';
import { JournalData } from '../models/journalData.model';
import { Month } from '../models/month.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherJournalsService {

  public journalChanged = new Subject<Journal>();

  readonly allJournals: string = '/journals';
  readonly activeJurnal: string = '/active';

  constructor(private http: HttpClient) { }

  public emitJournalChanged(journal: Journal) {
    this.journalChanged.next(journal);
  }

  private homeTaskUrl(idSubject: number, idClass: number): string {
    return '/homeworks/subjects/' + idSubject + '/classes/' + idClass;
  }

  private urlForTeacher(teacherId?: number, isActive?: boolean): string {
    if (teacherId > 0) {
      if (isActive) {
        return this.allJournals + '/teachers/' + teacherId + this.activeJurnal;
      } else {
        return this.allJournals + '/teachers/' + teacherId;
      }
    } else {
      return this.allJournals; // all journals for current user/teacher
    }
  }

  private urlJournalSubject(idSubject: number, idClass: number) {
    if (idSubject + idClass > 1) {
      return this.allJournals + '/subjects/' + idSubject + '/classes/' + idClass;
    } else {
      return;
    }
  }

  public getJournalsTeacher(id?: number, isActive?: boolean): Observable<Journal[]> {
    const url = this.urlForTeacher(id, isActive);
    const observerResponse = this.http.get<Journal[]>(url)
    .map( (response: any) => {
      return response.data;
    })
    .catch( (error: any) => {
      return throwError(error);
    });
    return observerResponse;
  }

  public getHomeworks(idSubject: number, idClass: number): Observable<Hometask[]> {
    return this.http.get<Hometask[]>(this.homeTaskUrl(idSubject, idClass))
      .map( (response: any) => {
        return response.data;
      }).catch( (error: any) => {
        return throwError(error);
      });
  }

  public getjournals(idSubject: number, idClass: number): Observable<JournalData[]> {
    return this.http.get<JournalData[]>(this.urlJournalSubject(idSubject, idClass))
    .map( (response: any) => {
      return response.data;
    })
    .catch( (error: any) => {
      //MARK: remove in production
      console.log('Error data from API:' + error);
      return Observable.throwError(error);
    });
  }

  public getPreparedMonths(journal: JournalData[]): Month[] {
    const res: Month[] = [];
    if (journal) {
      const markDates: string[] = [];
      for (let studentIndex = 0; studentIndex < journal.length; studentIndex++) {
        for (let markIndex = 0; markIndex < journal[studentIndex].marks.length; markIndex++) {
          const markObject = journal[studentIndex].marks[markIndex];
          const month = this.getMonths(markObject.dateMark, '.');
          if (markDates.indexOf(month) >= 0) {
            continue;
          } else {
            markDates.push(month);
            const formatedDate = markObject.dateMark;
            const formatedMonth = formatedDate.slice(0, formatedDate.lastIndexOf('.'));
            const monthElement: Month = {label: month, value: formatedMonth};
            res.push(monthElement);
          }
        }
      }
      return res;
    } else { return []; }
  }

  private getMonths(date:string, separator: string): string {
    const months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    const res = date.split(separator);
    if (res[1]) {
      return months[(+res[1] - 1)] + ' ' + res[0];
    }
    return;
  }

  public getExistingJournalMonths(month: Month, journalsData: JournalData[]) {

    const isThisMonth = (element, index, array) => {
      return (element.dateMark.indexOf(month) === 0);
    };
    for (let studentIndex = 0; studentIndex < journalsData.length; studentIndex++) {
      const marks = journalsData[studentIndex].marks;
      const marksFiltered = marks.filter(isThisMonth);
    }
  }

}
