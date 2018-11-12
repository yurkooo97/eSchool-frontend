import { Injectable } from '@angular/core';
import { Journal } from '../models/journal.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const teacherId = 21;

@Injectable({
  providedIn: 'root'
})
export class TeacherJournalsService {

  constructor(private http: HttpClient) { }

  private journalUrl = 'https://fierce-shore-32592.herokuapp.com/journals/teachers/' + teacherId + '/active';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
  getJournals(): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.journalUrl, this.httpOptions);
  }

}
